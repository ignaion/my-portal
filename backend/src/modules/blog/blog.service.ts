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
      // store original markdown as well
      values.contentMarkdown = createPostDto.contentMarkdown;
    } else if (values.content) {
      // sanitize HTML content as a fallback
      values.content = renderMarkdownToSafeHtml(values.content);
    }

    // Ensure author field present (fallback to env or 'Igna')
    values.author = values.author || process.env.DEFAULT_AUTHOR || 'Igna';

    const [post] = await this.db.insert(blogPosts).values(values).returning();
    return post;
  }

  async updatePost(slug: string, updateDto: Partial<typeof blogPosts.$inferInsert>) {
    const values: any = { ...updateDto };

    if (values.contentMarkdown) {
      values.content = renderMarkdownToSafeHtml(values.contentMarkdown);
      // store original markdown in the drizzle schema field (contentMarkdown)
      values.contentMarkdown = values.contentMarkdown;
    } else if (values.content) {
      values.content = renderMarkdownToSafeHtml(values.content);
    }

    // Ensure author present
    if (!values.author) {
      values.author = process.env.DEFAULT_AUTHOR || 'Igna';
    }

    // If updating slug, ensure not colliding with existing post
    if (values.slug && values.slug !== slug) {
      const [exists] = await this.db.select().from(blogPosts).where(eq(blogPosts.slug, values.slug));
      if (exists) {
        const err: any = new Error('Slug already exists');
        err.code = 'SLUG_EXISTS';
        throw err;
      }
    }

    const [post] = await this.db.update(blogPosts).set(values).where(eq(blogPosts.slug, slug)).returning();
    return post;
  }
}


