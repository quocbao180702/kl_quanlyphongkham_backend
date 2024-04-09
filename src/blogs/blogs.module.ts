import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsResolver } from './blogs.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './entities/blog.entity';

@Module({
  providers: [BlogsResolver, BlogsService],
  imports: [MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }])]
})
export class BlogsModule { }
