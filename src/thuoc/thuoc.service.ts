import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Thuoc } from './schemas/thuoc.schema';
import { Model } from 'mongoose';
import { CreateThuocDto } from './dto/create-thuoc.dto';
import { UpdateThuocInput } from './dto/update-thuoc.input';

@Injectable()
export class ThuocService {

    constructor(@InjectModel(Thuoc.name) private readonly thuocModel: Model<Thuoc>) { }

    async getAllThuoc(): Promise<Thuoc[]> {
        return await this.thuocModel.find().exec();
    }

    async createThuoc(createThuocDto: CreateThuocDto): Promise<Thuoc> {
        const createdThuoc = await this.thuocModel.create(createThuocDto);
        return createdThuoc;
    }

    async updateThuoc(updateThuoc: UpdateThuocInput): Promise<Thuoc | null> {
        return await this.thuocModel.findByIdAndUpdate(
            updateThuoc.id,
            { $set: { ...updateThuoc } },
            { new: true }
        ).exec();
    }

    async deleteThuoc(_id: string): Promise<void> {
        await this.thuocModel.deleteOne({ _id });
    }
}
