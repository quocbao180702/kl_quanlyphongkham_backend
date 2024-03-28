import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NhanVien } from './entities/nhanvien.entity';
import { Model } from 'mongoose';
import { UpdateNhanVienInput } from './dto/update-nhanvien.input';
import { NewNhanVienInput } from './dto/new-nhanvien.input';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class NhanvienService {
    constructor(@InjectModel(NhanVien.name) private readonly nhanVienModel: Model<NhanVien>,
        private readonly userService: UsersService) { }

    async getAllNhanVien(): Promise<NhanVien[] | null> {
        return await this.nhanVienModel.find().populate('phongs').populate('user').exec();
    }

    async getNhanVienbyUserId(user: string): Promise<NhanVien | null> {
        const nhanVien = await this.nhanVienModel.findOne({ user: user }).populate('phongs').populate('user').exec();
        return nhanVien;
    }

    async createNhanVien(newNhanVien: NewNhanVienInput): Promise<NhanVien | null> {
        try {
            const user = await this.userService.getUserByUsername(newNhanVien.username);
            if (user.thongtin == true) {
                throw new Error('User đã có thông tin');
            }
            const createdNhanVien = await this.nhanVienModel.create({ ...newNhanVien, user: user?._id });
            const populatedNhanVien = await createdNhanVien.populate('phongs');
            await this.userService.updateTrangThaiThongTinUser(user?._id.toString());
            return populatedNhanVien;
        } catch (error) {
            throw new Error('Nhân Viên xử lý khóa bị lỗi: ' + error.message);
        }
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

    async deleteNhanVien(_id: string): Promise<boolean> {
        const result = await this.nhanVienModel.deleteOne({ _id }).exec();
        return result.deletedCount > 0;
    }

}
