import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BenhNhan } from './schemas/benhnhan.schema';
import { Model } from 'mongoose';
import { CreateBenhNhanDto } from './dto/create-benhnhan.dto';
import { UpdateBenhNhanInput } from './dto/update-benhnhan.input';
import { Schema as MongooseSchema } from "mongoose";

@Injectable()
export class BenhnhanService {
    constructor(@InjectModel(BenhNhan.name) private readonly benhnhanModel: Model<BenhNhan>){}

    async getAllBenhNhan(): Promise<BenhNhan[]>{
        return await this.benhnhanModel.find().exec();
    }

    async createBenhNhan(createBenhNhanDto: CreateBenhNhanDto): Promise<BenhNhan | null>{
        const createBenhNhan = await this.benhnhanModel.create(createBenhNhanDto);
        return createBenhNhan;
    }

    async updateBenhNhan(updateBenhNhan: UpdateBenhNhanInput): Promise<BenhNhan | null>{
        return await this.benhnhanModel.findByIdAndUpdate(
            updateBenhNhan._id,
            {$set: {
                ...updateBenhNhan
            }},
            {new: true}
        ).exec();
    }

    async deleteBenhNhan(_id: string): Promise<void>{
        await this.benhnhanModel.deleteOne({_id});
    }
}
