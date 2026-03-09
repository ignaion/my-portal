import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello from My Portal Backend!';
  }

  getAbout(): {
    name: string;
    title: string;
    experience: string[];
  } {
    return {
      name: 'Iga Ion Resmana',
      title: 'Professional',
      experience: [
        'Full Stack Developer',
        'Software Engineer'
      ]
    };
  }
}