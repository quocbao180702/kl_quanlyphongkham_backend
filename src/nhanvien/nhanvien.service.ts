import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NhanVien } from './entities/nhanvien.entity';
import { Model } from 'mongoose';
import { UpdateNhanVienInput } from './dto/update-nhanvien.input';
import { NewNhanVienInput } from './dto/new-nhanvien.input';

@Injectable()
export class NhanvienService {
    constructor(@InjectModel(NhanVien.name) private readonly nhanVienModel: Model<NhanVien>) { }

    async getAllNhanVien(): Promise<NhanVien[] | null> {
        return await this.nhanVienModel.find().exec();
    }

    async getNhanVienbyUserId(user: string): Promise<NhanVien | null> {
        const nhanVien = await this.nhanVienModel.findOne({ user: user }).populate('phongs').populate('user').exec();
        return nhanVien;
    }

    async createNhanVien(newNhanVien: NewNhanVienInput): Promise<NhanVien | null> {
        const createNhanVien = (await (await this.nhanVienModel.create(newNhanVien)).populate('phongs')).populate('user');
        return createNhanVien;
    }

    async updateNhanVien(updateNhanVien: UpdateNhanVienInput): Promise<NhanVien | null> {
        return await this.nhanVienModel.findByIdAndUpdate(
            updateNhanVien.id,
            {
                $set: {
                    ...updateNhanVien
                }
            },
            { new: true }
        ).exec();
    }

    async deleteNhanVien(_id: string): Promise<void> {
        await this.nhanVienModel.deleteOne({ _id });
    }

}
