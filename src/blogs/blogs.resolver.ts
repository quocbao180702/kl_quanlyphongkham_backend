import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BlogsService } from './blogs.service';
import { Blog } from './entities/blog.entity';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { FetchPagination } from 'src/types/fetchPagination.input';
import { HasRoles } from 'src/auth/dto/has-roles.decorator';
import { UserRole } from 'src/types/Users.types';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Resolver()
export class BlogsResolver {
  constructor(private readonly blogsService: BlogsService) { }

  @Mutation(() => Blog)
  async createBlog(@Args('createBlogInput') createBlogInput: CreateBlogInput): Promise<Blog | null> {
    const newBlog = await this.blogsService.createBlog(createBlogInput);
    return newBlog;
  }

  @Query(() => Number, { name: 'countBlogs' })
  async getCount(): Promise<number> {
    return await this.blogsService.getCount();
  }

  @Query(() => [Blog])
  async getAllBlog(@Args('fetchPagination') fetchPagination: FetchPagination) {
    return await this.blogsService.getAllBlog(fetchPagination);
  }

  @Query(() => [Blog])
  async getLastestBlog(@Args('limit') limit: number): Promise<Blog[] | null> {
    return await this.blogsService.getLastestBlog(limit);
  }

  @Query(() => Blog)
  async getBlogbyId(@Args('id') id: string): Promise<Blog | null> {
    return await this.blogsService.getBlogbyId(id);
  }

  @HasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Boolean)
  async updateKichHoat(@Args('_id') _id: string): Promise<boolean> {
    await this.blogsService.updateKichHoat(_id)
    return true
  }

  /* @Query(() => Blog, { name: 'blog' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.blogsService.findOne(id);
  }
 */
  @Mutation(() => Blog)
  updateBlog(@Args('updateBlogInput') updateBlogInput: UpdateBlogInput) {
    return this.blogsService.updateBlog(updateBlogInput);
  }

  @Mutation(() => Boolean)
  deleteBlog(@Args('id', { type: () => String }) id: string): Promise<boolean> {
    return this.blogsService.deleteBlog(id);
  }
}
