import { Injectable } from '@nestjs/common';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Blog } from './entities/blog.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FetchPagination } from 'src/types/fetchPagination.input';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private readonly blogModel: Model<Blog>) { }

  async getCount(): Promise<number> {
    const count = await this.blogModel.countDocuments()
    return count
  }

  async createBlog(createBlogDto: CreateBlogInput): Promise<Blog | null> {
    const createdBlog = await this.blogModel.create(createBlogDto);
    return createdBlog;
  }

  async getLastestBlog(litmit: number): Promise<Blog[] | null>{
      return this.blogModel.find().sort({ngaytao: -1}).limit(litmit).populate('user').exec();
  }

  async getAllBlog(fetchPagination: FetchPagination): Promise<Blog[]> {
    return await this.blogModel.find(null, null, {
      limit: fetchPagination.take,
      skip: fetchPagination.skip
    }).populate('user').exec();
  }

  async getBlogbyId(id: string): Promise<Blog | null>{
    return await this.blogModel.findById(id).populate('user').exec();
  }

  async updateKichHoat(id: string): Promise<Blog | null> {
    try {
      const blog = await this.blogModel.findById(id).exec();
      if (!blog) {
        throw new Error('Blog not found');
      }
      blog.kichhoat = !blog.kichhoat;
      return await blog.save();
    } catch (error) {
      throw new Error('Error xử lý kích hoạt bị lỗi: ' + error.message);
    }
  }


  async updateBlog(updateBlog: UpdateBlogInput): Promise<Blog | null> {
    return await this.blogModel.findByIdAndUpdate(
      updateBlog.id,
      {
        $set: {
          ...updateBlog
        }
      },
      { new: true }
    ).exec();
  }


  async deleteBlog(_id: string): Promise<boolean> {
    const result = await this.blogModel.deleteOne({ _id }).exec();
    return result.deletedCount > 0
  }
}
