import { Controller, Get, Post, Body, Param, Query, Headers, ForbiddenException, Req } from '@nestjs/common';
import { Request } from 'express';
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

  // DEBUG endpoint (temporary) to inspect header vs env without leaking full secret
  @Get('debug')
  async debug(@Req() req: Request) {
    const env = process.env.ADMIN_API_KEY;
    const header = req.headers['x-admin-key'] as string | undefined;
    return {
      envSet: !!env,
      envLength: env ? env.length : null,
      headerPresent: !!header,
      headerLength: header ? header.length : null,
      headerSample: header ? header.slice(0, 4) + '...' : null,
      match: env && header ? header === env : false,
    };
  }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto, @Headers('x-admin-key') adminKey?: string) {
    const expected = process.env.ADMIN_API_KEY;
    if (!expected || adminKey !== expected) {
      throw new ForbiddenException('Invalid admin key');
    }
    return this.blogService.createPost(createPostDto);
  }
}

