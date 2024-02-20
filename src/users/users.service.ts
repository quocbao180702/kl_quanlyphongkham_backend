import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.input';
import { Args } from '@nestjs/graphql';


@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private readonly userModel: Model<Users>) { }

  async getAllUsers(): Promise<Users[]> {
    return await this.userModel.find().exec();
  }

  async getUserByUsername(@Args('username') username: string): Promise<Users> {
    return await this.userModel.findOne({ username }).exec();
  }

  async getUserByEmail(@Args('email') email: string): Promise<Users | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async getUserById(@Args('_id') _id: string): Promise<Users | null> {
    return await this.userModel.findOne({ _id }).exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const createdCat = await this.userModel.create(createUserDto);
    return createdCat;
  }


  async updateUser(_id: string, updateUser: UpdateUserInput): Promise<Users | null> {
    return await this.userModel.findByIdAndUpdate(
      _id,
      { $set: { ...updateUser } },
      { new: true }
    ).exec();
  }

  async deleteUser(_id: string): Promise<void> {
    await this.userModel.deleteOne({ _id });
  }

}
