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
    const crypto = await import('crypto');
    const env = process.env.ADMIN_API_KEY;
    const header = req.headers['x-admin-key'] as string | undefined;
    const envHash = env ? crypto.createHash('sha256').update(env).digest('hex').slice(0, 12) : null;
    const headerHash = header ? crypto.createHash('sha256').update(header).digest('hex').slice(0, 12) : null;
    return {
      envSet: !!env,
      envLength: env ? env.length : null,
      envHash,
      headerPresent: !!header,
      headerLength: header ? header.length : null,
      headerHash,
      match: env && header ? header === env : false,
    };
  }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto, @Headers('x-admin-key') adminKey?: string) {
    // Temporary logging for debugging admin key mismatch (do not keep long-term)
    try {
      const env = process.env.ADMIN_API_KEY;
      const headerSample = adminKey ? adminKey.slice(0, 6) + '...' : null;
      const envLen = env ? env.length : null;
      console.log('[DEBUG] createPost called. headerSample=', headerSample, 'envLen=', envLen);
    } catch (e) {
      // ignore
    }

    const expected = process.env.ADMIN_API_KEY;
    if (!expected || adminKey !== expected) {
      throw new ForbiddenException('Invalid admin key');
    }
    return this.blogService.createPost(createPostDto);
  }
}

