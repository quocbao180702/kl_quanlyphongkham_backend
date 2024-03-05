import { Injectable } from '@nestjs/common';
import { CreateSinhhieuInput } from './dto/create-sinhhieu.input';
import { UpdateSinhhieuInput } from './dto/update-sinhhieu.input';
import { InjectModel } from '@nestjs/mongoose';
import { Sinhhieu } from './entities/sinhhieu.entity';
import { Model } from 'mongoose';

@Injectable()
export class SinhhieuService {
  constructor(@InjectModel(Sinhhieu.name) private readonly sinhhieuModel: Model<Sinhhieu>) { }

    async getAllSinhhieu(): Promise<Sinhhieu[]> {
        return await this.sinhhieuModel.find()
                      .populate('benhnhan')  
                      .exec();
    }

    async getAllSinhHieuByBenhNhan(benhnhanId: string): Promise<Sinhhieu>{
        return await this.sinhhieuModel.findOne({benhnhan: benhnhanId}).exec();
    }

    async createSinhhieu(createSinhhieuInput: CreateSinhhieuInput): Promise<Sinhhieu> {
        const createdSinhhieu = (await this.sinhhieuModel.create(createSinhhieuInput)).populate('benhnhan');
        return createdSinhhieu;
    }

    async updateSinhhieu(updateSinhhieu: UpdateSinhhieuInput): Promise<Sinhhieu | null> {
        return await this.sinhhieuModel.findByIdAndUpdate(
            updateSinhhieu.id,
            { $set: { ...updateSinhhieu } },
            { new: true }
        ).exec();
    }

    async deleteSinhhieu(_id: string): Promise<void> {
        await this.sinhhieuModel.deleteOne({ _id });
    }
}
