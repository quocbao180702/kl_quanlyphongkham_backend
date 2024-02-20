import { Injectable } from '@nestjs/common';
import { CreateDichvuInput } from './dto/create-dichvu.input';
import { UpdateDichvuInput } from './dto/update-dichvu.input';
import { InjectModel } from '@nestjs/mongoose';
import { Dichvu } from './entities/dichvu.entity';
import { Model } from 'mongoose';

@Injectable()
export class DichvuService {

  constructor(@InjectModel(Dichvu.name) private readonly dichvuModel: Model<Dichvu>) { }


  async getAllDichVu(): Promise<Dichvu[]> {
    return await this.dichvuModel.find().exec();
  }

  async createDichVu(createDichVuDto: CreateDichvuInput): Promise<Dichvu | null> {
    const createDichVu = await this.dichvuModel.create(createDichVuDto);
    return createDichVu;
  }


  async updateDichVu(updateDichVuInput: UpdateDichvuInput): Promise<Dichvu | null> {
    return await this.dichvuModel.findByIdAndUpdate(
      updateDichVuInput.id,
      {
        $set: {
          ...updateDichVuInput
        }
      },
      { new: true }
    ).exec();
  }

  async deleteDichVu(_id: string): Promise<void> {
    await this.dichvuModel.deleteOne({ _id });
  }
}
