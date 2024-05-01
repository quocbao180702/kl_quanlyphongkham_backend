import { Injectable } from '@nestjs/common';
import { CreateLichkhamInput } from './dto/create-lichkham.input';
import { UpdateLichkhamInput } from './dto/update-lichkham.input';
import { Lichkham } from './entities/lichkham.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LichkhamService {

  constructor(@InjectModel(Lichkham.name) private readonly LichkhamModel: Model<Lichkham>) { }

  async getLichbyId(_id: string): Promise<Lichkham | null> {
    return await this.LichkhamModel.findOne({ _id }).exec();
  }

  async getAllLich(): Promise<Lichkham[] | null> {
    return await this.LichkhamModel.find().exec();
  }

  async createLichKham(createLichKham: CreateLichkhamInput): Promise<Lichkham | null> {
    return await this.LichkhamModel.create(createLichKham);
  }

  async updateLichKham(updateLichKham: UpdateLichkhamInput): Promise<Lichkham | null> {
    return await this.LichkhamModel.findByIdAndUpdate(
      updateLichKham.id,
      {
        $set: {
          ...updateLichKham
        }
      },
      { new: true }
    ).exec();
  }

  async deleteLichKham(_id: string): Promise<boolean> {
    const result = this.LichkhamModel.deleteOne({ _id }).exec();
    return (await result).deletedCount > 0;
  }
}
