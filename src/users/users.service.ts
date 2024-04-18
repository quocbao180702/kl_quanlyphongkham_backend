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
import { FetchUsersArgs } from './dto/fetch_user.input';
import { RegisterInput } from './dto/registerInput';
import { register } from 'module';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private readonly userModel: Model<Users>) { }

  async getCount(): Promise<number> {
    const count = await this.userModel.countDocuments()
    return count
  }
  async getAllUsers(fetchUserArgs: FetchUsersArgs): Promise<Users[] | null> {
    return await this.userModel.find(null, null, {
      limit: fetchUserArgs.take,
      skip: fetchUserArgs.skip
    }).exec() as Users[];
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

  async updateTrangThaiThongTinUser(id: string): Promise<Users | null> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new Error('User not found');
      }
      user.thongtin = !user.thongtin;
      return await user.save();
    } catch (error) {
      throw new Error('Error xử lý khóa bị lỗi: ' + error.message);
    }
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

  async registerUser(register: RegisterInput): Promise<Users> {
    try {
      const password = await hashPassword(register?.password);
      const registerUser = await this.userModel.create({
        ...register,
        password
      })
      return registerUser;
    } catch (error) {
      throw new Error('Error creatign user: ' + error.message);
    }
  }

  async createUserGoogle(username: string, email: string, avatar: LinkImageInput): Promise<Users> {
    try {
      const password = await hashPassword('abc@123');
      const createUser = await this.userModel.create({
        username: username,
        email: email,
        avatar: avatar,
        password: password
      })
      return createUser;

    } catch (error) {
      throw new Error('Error create with google');
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
