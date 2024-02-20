import { Injectable } from '@nestjs/common';
import { CreateToathuocInput } from './dto/create-toathuoc.input';
import { UpdateToathuocInput } from './dto/update-toathuoc.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Toathuoc } from './entities/toathuoc.entity';

@Injectable()
export class ToathuocService {
  constructor(@InjectModel(Toathuoc.name) private readonly toathuochModel: Model<Toathuoc>) { }

  async getAllToaThuoc(): Promise<Toathuoc[] | null> {
    return await this.toathuochModel.find()
      .populate('benhnhan')
      .populate('bacsi')
      .populate('thuocs')
      .populate('benhs')
      .exec();
  }

  async createToathuoc(createToathuoc: CreateToathuocInput): Promise<Toathuoc | null> {
    const createdToathuoc = (await this.toathuochModel.create(createToathuoc)).populate('benhnhan');
    return createdToathuoc;
  }

  async updateToathuoc(updateToathuoc: UpdateToathuocInput): Promise<Toathuoc | null> {
    return await this.toathuochModel.findByIdAndUpdate(
      updateToathuoc.id,
      {
        $set: {
          ...updateToathuoc
        }
      },
      { new: true }
    ).exec();
  }

  async deleteToathuoc(_id: string): Promise<void> {
    await this.toathuochModel.deleteOne({ _id });
  }
}
