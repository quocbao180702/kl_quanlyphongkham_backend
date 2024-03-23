import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BenhNhan } from './entities/benhnhan.entity';
import { Model } from 'mongoose';
import { UpdateBenhNhanInput } from './dto/update-benhnhan.input';
import { FetchPagination } from 'src/types/fetchPagination.input';
import { NewBenhNhanInput } from './dto/new-benhnhan.input';

@Injectable()
export class BenhnhanService {
    constructor(@InjectModel(BenhNhan.name) private readonly benhnhanModel: Model<BenhNhan>) { }

    async getCount(): Promise<number> {
        const count = await this.benhnhanModel.countDocuments();
        return count
    }

    async getAllBenhNhan(fetchPagination: FetchPagination): Promise<BenhNhan[] | null> {
        return await this.benhnhanModel.find(null, null, {
            limit: fetchPagination.take,
            skip: fetchPagination.skip
        }).populate('user').exec();
    }

    async getBenhNhanbyId(_id: string): Promise<BenhNhan | null> {
        const benhNhan = await this.benhnhanModel.findOne({ _id }).populate('user').exec();
        return benhNhan;
    }

    async getBenhNhanbyUserId(user: string): Promise<BenhNhan | null> {
        return await this.benhnhanModel.findOne({ user: user }).populate('user').exec();
    }


    async createBenhNhan(createBenhNhanDto: NewBenhNhanInput): Promise<BenhNhan | null> {
        const createBenhNhan = (await this.benhnhanModel.create(createBenhNhanDto)).populate('user');
        return createBenhNhan;
    }

    async updateBenhNhan(updateBenhNhan: UpdateBenhNhanInput): Promise<BenhNhan | null> {
        return await this.benhnhanModel.findByIdAndUpdate(
            updateBenhNhan._id,
            {
                $set: {
                    ...updateBenhNhan
                }
            },
            { new: true }
        ).exec();
    }

    async deleteBenhNhan(_id: string): Promise<void> {
        await this.benhnhanModel.deleteOne({ _id });
    }
}
