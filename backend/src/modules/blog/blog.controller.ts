import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { blogPosts } from '../../db/schema';

type CreatePostDto = typeof blogPosts.$inferInsert;

@Controller('api/blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async getAllPosts(@Query('published') published: string) {
    const isPublished = published === 'true';
    return this.blogService.getPosts(isPublished);
  }

  @Get(':slug')
  async getPostBySlug(@Param('slug') slug: string) {
    return this.blogService.getPostBySlug(slug);
  }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    return this.blogService.createPost(createPostDto);
  }
}
