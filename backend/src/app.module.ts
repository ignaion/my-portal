import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { BlogModule } from './modules/blog/blog.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    BlogModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
