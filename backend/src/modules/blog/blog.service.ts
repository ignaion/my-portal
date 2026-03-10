import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { blogPosts } from '../../db/schema';

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
    const [post] = await this.db.insert(blogPosts).values(createPostDto).returning();
    return post;
  }
}
