import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Profile } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello from My Portal Backend!';
  }

  async getAbout(): Promise<{
    name: string;
    title: string;
    experience: string[];
  }> {
    // Fetch profile from database
    const profile = await this.prisma.profile.findFirst();
    if (profile) {
      return {
        name: profile.name,
        title: profile.title,
        experience: ['Full Stack Developer', 'Software Engineer']
      };
    }
    // Fallback to default if no profile in DB
    return {
      name: 'Iga Ion Resmana',
      title: 'Professional',
      experience: ['Full Stack Developer', 'Software Engineer']
    };
  }

  // Example method to create a profile
  async createProfile(data: { name: string; title: string }): Promise<Profile> {
    return this.prisma.profile.create({
      data,
    });
  }

  // Get all profiles
  async getProfiles(): Promise<Profile[]> {
    return this.prisma.profile.findMany();
  }
}