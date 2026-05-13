import { Controller, Get, Post, Patch, Body, Param, Query, Headers, ForbiddenException, Req, Inject } from '@nestjs/common';
import { Request } from 'express';
import { BlogService } from './blog.service';
import { blogPosts } from '../../db/schema';
import { AuthService } from '../auth/auth.service';

type CreatePostDto = typeof blogPosts.$inferInsert;

@Controller('api/blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}

  @Get()
  async getAllPosts(@Query('published') published: string) {
    // If no `published` query provided, default to showing only published posts to public viewers.
    // Previous code used `published === 'true'` which converts undefined -> false and returned drafts unintentionally.
    const isPublished = published === undefined ? true : published === 'true';
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
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Headers('x-admin-key') adminKey?: string,
    @Headers('authorization') authorization?: string,
  ) {
    // Accept either ADMIN_API_KEY via x-admin-key OR a valid JWT (Bearer)
    const expected = process.env.ADMIN_API_KEY;
    let ok = false;

    if (expected && adminKey === expected) ok = true;

    if (!ok && authorization) {
      const parts = authorization.split(' ');
      if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
        const token = parts[1];
        const verified = this.authService.verifyToken(token);
        if (verified) ok = true;
      }
    }

    if (!ok) {
      throw new ForbiddenException('Invalid admin credentials');
    }

    return this.blogService.createPost(createPostDto);
  }

  @Patch(':slug')
  async updatePost(
    @Param('slug') slug: string,
    @Body() updateDto: Partial<CreatePostDto>,
    @Headers('x-admin-key') adminKey?: string,
    @Headers('authorization') authorization?: string,
  ) {
    const expected = process.env.ADMIN_API_KEY;
    let ok = false;

    if (expected && adminKey === expected) ok = true;

    if (!ok && authorization) {
      const parts = authorization.split(' ');
      if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
        const token = parts[1];
        const verified = this.authService.verifyToken(token);
        if (verified) ok = true;
      }
    }

    if (!ok) {
      throw new ForbiddenException('Invalid admin credentials');
    }

    return this.blogService.updatePost(slug, updateDto as any);
  }
}


