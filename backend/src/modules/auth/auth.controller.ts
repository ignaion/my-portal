import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    // Simple admin login using ADMIN_USERNAME/ADMIN_PASSWORD from env
    const user = process.env.ADMIN_USERNAME || 'admin';
    const pass = process.env.ADMIN_PASSWORD || 'adminpass';
    if (body.username === user && body.password === pass) {
      const token = this.auth.createToken({ username: body.username });
      return { token };
    }
    return { status: 'error', message: 'Invalid credentials' };
  }
}
