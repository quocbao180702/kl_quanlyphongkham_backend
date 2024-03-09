import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.input';
import { Args } from '@nestjs/graphql';
import { hashPassword } from 'src/HashPassword/hash';
import { LinkImageInput } from 'src/types/LinkImage.input';
import { LinkImage } from 'src/types/LinkImage.types';


@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private readonly userModel: Model<Users>) { }

  async getAllUsers(): Promise<Users[] | null> {
    return await this.userModel.find().exec();
  }

  async getUserByUsername(@Args('username') username: string): Promise<Users | null> {
    return await this.userModel.findOne({ username }).exec();
  }

  async getUserByEmail(@Args('email') email: string): Promise<Users | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async getUserById(@Args('_id') _id: string): Promise<Users | null> {
    return await this.userModel.findOne({ _id }).exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    try {
      const password = await hashPassword(createUserDto.password);

      const createdUser = await this.userModel.create({
        ...createUserDto,
        password,
      });
      return createdUser;
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  async updateUser(updateUser: UpdateUserInput): Promise<Users | null> {
    try {
      const password = await hashPassword(updateUser.password);
      return await this.userModel.findByIdAndUpdate(
        updateUser.id,
        { $set: { ...updateUser, password } },
        { new: true }
      ).exec();
    } catch (error) {
      throw new Error('Error update user: ' + error.message)
    }
  }

  async xuly_Khoa(id: string): Promise<Users | null> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new Error('User not found');
      }
      user.isLocked = !user.isLocked;
      return await user.save();
    } catch (error) {
      throw new Error('Error xử lý khóa bị lỗi: ' + error.message);
    }
  }

  async deleteUser(_id: string): Promise<void> {
    await this.userModel.deleteOne({ _id });
  }

}
