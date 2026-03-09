import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Profile } from './entities/profile.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: EntityRepository<Profile>,
  ) {}

  getHello(): string {
    return 'Hello from My Portal Backend!';
  }

  async getAbout(): Promise<{
    name: string;
    title: string;
    experience: string[];
  }> {
    // Fetch profile from database
    const profile = await this.profileRepository.findOne({});
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
    const profile = new Profile();
    profile.name = data.name;
    profile.title = data.title;
    await this.profileRepository.persistAndFlush(profile);
    return profile;
  }

  // Get all profiles
  async getProfiles(): Promise<Profile[]> {
    return this.profileRepository.findAll();
  }
}