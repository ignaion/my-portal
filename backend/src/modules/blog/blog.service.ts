import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { blogPosts } from '../../db/schema';
import renderMarkdownToSafeHtml from '../../utils/markdown';

@Injectable()
export class BlogService {
  constructor(@Inject('DRIZZLE_CLIENT') private readonly db: any) {}

  async getPosts(published?: boolean) {
    if (published !== undefined) {
      return this.db.select().from(blogPosts).where(eq(blogPosts.isPublished, published));
    }
    return this.db.select().from(blogPosts);
  }

  async getPostBySlug(slug: string) {
    const [post] = await this.db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async createPost(createPostDto: typeof blogPosts.$inferInsert) {
    // If content is provided in markdown, render and sanitize to safe HTML
    const values = { ...createPostDto } as any;
    if (values.contentMarkdown) {
      values.content = renderMarkdownToSafeHtml(values.contentMarkdown);
    } else if (values.content) {
      // sanitize HTML content as a fallback
      values.content = renderMarkdownToSafeHtml(values.content);
    }

    const [post] = await this.db.insert(blogPosts).values(values).returning();
    return post;
  }
}

