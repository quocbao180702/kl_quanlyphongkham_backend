import { Injectable } from '@nestjs/common';
import { UpdateLoaicanlamsangInput } from './dto/update-loaicanlamsang.input';
import { InjectModel } from '@nestjs/mongoose';
import { LoaiCanLamSang } from './entities/loaicanlamsang.entity';
import { Model } from 'mongoose';
import { CreateLoaicanlamsangDto } from './dto/create-loaicanlamsang.dto';

@Injectable()
export class LoaicanlamsangService {

  constructor(@InjectModel(LoaiCanLamSang.name) private readonly loaiCanLamSangModel: Model<LoaiCanLamSang>) { }

  async getAllLoaiCLS(): Promise<LoaiCanLamSang[] | null> {
    try {
      const loaiCLSList = await this.loaiCanLamSangModel.find().sort({ loaicanlamsang: 1 }).exec();
      return loaiCLSList;
    } catch (error) {
      console.error("Error while fetching LoaiCanLamSang data:", error);
      return null;
    }
  }

  async createLoaiCLS(createLoaiCanLamSang: CreateLoaicanlamsangDto): Promise<LoaiCanLamSang | null> {
    const createdLoaiCanLamSang = await this.loaiCanLamSangModel.create(createLoaiCanLamSang);
    return createdLoaiCanLamSang;
  }

  async updateLoaiCLS(updateLoaiCanLamSang: UpdateLoaicanlamsangInput): Promise<LoaiCanLamSang | null> {
    return await this.loaiCanLamSangModel.findByIdAndUpdate(
      updateLoaiCanLamSang.id,
      {
        $set: {
          ...updateLoaiCanLamSang
        }
      },
      { new: true }
    ).exec();
  }

  async deleteLoaiCLS(_id: string): Promise<void> {
    await this.loaiCanLamSangModel.deleteOne({ _id });
  }
}
