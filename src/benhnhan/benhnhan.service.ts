import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BenhNhan } from './entities/benhnhan.entity';
import { Model } from 'mongoose';
import { CreateBenhNhanDto } from './dto/create-benhnhan.dto';
import { UpdateBenhNhanInput } from './dto/update-benhnhan.input';
import { Schema as MongooseSchema } from "mongoose";
import { FetchPagination } from 'src/types/fetchPagination.input';

@Injectable()
export class BenhnhanService {
    constructor(@InjectModel(BenhNhan.name) private readonly benhnhanModel: Model<BenhNhan>){}

    async getCount(): Promise<number> {
        const count = await this.benhnhanModel.countDocuments();
        return count
    }

    async getAllBenhNhan(fetchPagination: FetchPagination): Promise<BenhNhan[] | null>{
        return await this.benhnhanModel.find(null, null, {
            limit: fetchPagination.take,
            skip: fetchPagination.skip
        }).populate('user').exec();
    }

    async getBenhNhanbyId(_id: string): Promise<BenhNhan| null>{
        return (await this.benhnhanModel.findOne({_id})).populate('user');
    }

    async createBenhNhan(createBenhNhanDto: CreateBenhNhanDto): Promise<BenhNhan | null>{
        const createBenhNhan = (await this.benhnhanModel.create(createBenhNhanDto)).populate('user');
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
