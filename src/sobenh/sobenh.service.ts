import { Injectable } from '@nestjs/common';
import { CreateSobenhInput } from './dto/create-sobenh.input';
import { UpdateSobenhInput } from './dto/update-sobenh.input';
import { InjectModel } from '@nestjs/mongoose';
import { Sobenh } from './entities/sobenh.entity';
import { Model } from 'mongoose';

@Injectable()
export class SobenhService {
  constructor(@InjectModel(Sobenh.name) private readonly sobenhModel: Model<Sobenh>) { }

    async getAllSobenh(): Promise<Sobenh[]> {
        return await this.sobenhModel.find()
                      .populate('benhnhan')
                      .exec();
    }

    async createSobenh(createSobenhDto: CreateSobenhInput): Promise<Sobenh> {
        const createdSobenh = (await this.sobenhModel.create(createSobenhDto)).populate('benhnhan');
        return createdSobenh;
    }

    async updateSobenh(updateSobenh: UpdateSobenhInput): Promise<Sobenh | null> {
        return await this.sobenhModel.findByIdAndUpdate(
            updateSobenh.id,
            { $set: { ...updateSobenh } },
            { new: true }
        ).exec();
    }

    async deleteSobenh(_id: string): Promise<void> {
        await this.sobenhModel.deleteOne({ _id });
    }
}
