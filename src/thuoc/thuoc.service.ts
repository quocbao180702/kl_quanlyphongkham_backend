import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Thuoc } from './entities/thuoc.entity';
import { Model } from 'mongoose';
import { UpdateThuocInput } from './dto/update-thuoc.input';
import { FetchPagination } from 'src/types/fetchPagination.input';
import { NewThuocInput } from './dto/new-thuoc.input';

@Injectable()
export class ThuocService {

    constructor(@InjectModel(Thuoc.name) private readonly thuocModel: Model<Thuoc>) { }

    async getCount(): Promise<number> {
        const count = await this.thuocModel.countDocuments();
        return count
    }

    async getAllThuoc(): Promise<Thuoc[]>{
        return await this.thuocModel.find().exec();
    }

    async getThuocPagination(fetchPagination: FetchPagination): Promise<Thuoc[]> {
        return await this.thuocModel.find(null, null,{
            limit: fetchPagination.take,
            skip: fetchPagination.skip
        }).exec();
    }

    async createThuoc(createThuocDto: NewThuocInput): Promise<Thuoc> {
        const createdThuoc = await this.thuocModel.create(createThuocDto);
        return createdThuoc;
    }

    async getThuocbyIds(ids: string[]): Promise<Thuoc[]> {
        const thuocs = await this.thuocModel.find({ _id: { $in: ids } });
        return thuocs
    }

    async updateSoluongThuoc(id: string, soluongdung: number): Promise<Thuoc> {
        try {
           return await this.thuocModel.findByIdAndUpdate(id, { $inc: { soluong: -soluongdung } });
        } catch (error) {
            // Xử lý lỗi nếu cần thiết
            console.error('Error updating thuoc quantity:', error);
            throw error;
        }
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
