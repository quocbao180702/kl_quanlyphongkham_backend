import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChuyenKhoa } from './schemas/chuyenkhoa.schema';
import { Model } from 'mongoose';
import { CreateChuyenKhoa } from './dto/create-chuyenkhoa.dto';
import { UpdateChuyenKhoaInput } from './dto/update-chuyenkhoa.input';

@Injectable()
export class ChuyenkhoaService {

    constructor(@InjectModel(ChuyenKhoa.name) private readonly chuyenkhoaModel: Model<ChuyenKhoa>){}

    async getAllChuyenKhoa(): Promise<ChuyenKhoa[]|null>{
        return await this.chuyenkhoaModel.find().exec();
    }

    async createChuyenKhoa(createChuyenKhoa: CreateChuyenKhoa): Promise<ChuyenKhoa |null>{
        const createdChuyenKhoa  = await this.chuyenkhoaModel.create(createChuyenKhoa);
        return createdChuyenKhoa;
    }

    async updateChuyenKhoa(updateChuyenKhoa: UpdateChuyenKhoaInput): Promise<ChuyenKhoa | null>{
        return await this.chuyenkhoaModel.findByIdAndUpdate(
            updateChuyenKhoa.id,
            {
                $set: {
                    ...updateChuyenKhoa
                }
            },
            {new: true}
        ).exec();
    }

    async deleteChuyenKhoa(_id: string): Promise<void>{
        await this.chuyenkhoaModel.deleteOne({_id});
    }
}
