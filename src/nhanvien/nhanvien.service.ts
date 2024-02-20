import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NhanVien } from './schemas/nhanvien.schema';
import { Model } from 'mongoose';
import { CreateNhanVienDto } from './dto/create-nhanvien.dto';
import { UpdateNhanVienInput } from './dto/update-nhanvien.input';

@Injectable()
export class NhanvienService {
    constructor(@InjectModel(NhanVien.name) private readonly nhanVienModel: Model<NhanVien>){}

    async getAllNhanVien(): Promise<NhanVien[] |null>{
        return await this.nhanVienModel.find().exec();
    }

    async createNhanVien(createNhanVienDto: CreateNhanVienDto): Promise<NhanVien|null>{
        const createNhanVien = await this.nhanVienModel.create(createNhanVienDto);
        return createNhanVien;
    }

    async updateNhanVien(_id: string, updateNhanVien: UpdateNhanVienInput): Promise<NhanVien|null>{
        return await this.nhanVienModel.findByIdAndUpdate(
            _id,
            {
                $set: {
                    ...updateNhanVien
                }
            },
            {new: true}
        ).exec();
    }

    async deleteNhanVien(_id: string): Promise<void>{
        await this.nhanVienModel.deleteOne({_id});
    }

}
