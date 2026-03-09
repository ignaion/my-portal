import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Profile } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('api/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('api/about')
  async getAbout(): Promise<{
    name: string;
    title: string;
    experience: string[];
  }> {
    return this.appService.getAbout();
  }

  @Get('api/profiles')
  async getProfiles(): Promise<Profile[]> {
    return this.appService.getProfiles();
  }
}