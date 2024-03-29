import { Injectable } from '@nestjs/common';
import { CreateHoadonInput } from './dto/create-hoadon.input';
import { UpdateHoadonInput } from './dto/update-hoadon.input';
import { InjectModel } from '@nestjs/mongoose';
import { Hoadon } from './entities/hoadon.entity';
import { Model } from 'mongoose';

@Injectable()
export class HoadonService {
    constructor(@InjectModel(Hoadon.name) private readonly hoadonModel: Model<Hoadon>) { }


    async getAllHoadon(): Promise<Hoadon[]> {
        return await this.hoadonModel.find()
            .populate('benhnhan')
            .exec();
    }

    async createHoaDon(createHoadonInput: CreateHoadonInput): Promise<Hoadon | null> {
        let thanhtien = 0;
        if (createHoadonInput.bhyt == true) {
            thanhtien = thanhtien + 12000;
        }
        else {
            thanhtien = thanhtien + 20000
        }
        const createHoaDon = await this.hoadonModel.create({ ...createHoadonInput, thanhtien });
        return createHoaDon;
    }


    async updateHoaDon(updateHoaDonInput: UpdateHoadonInput): Promise<Hoadon | null> {
        let thanhtien = 0;
        if (updateHoaDonInput.bhyt == true) {
            thanhtien = thanhtien + 12000;
        }
        else {
            thanhtien = thanhtien + 20000
        }

        if (updateHoaDonInput.thuocs) {
            for (const thuoc of updateHoaDonInput.thuocs) {
                thanhtien += thuoc.thanhtien;
            }
        }
        /* if (updateHoaDonInput?.canlamsangs) {
            for (const canLamSang of updateHoaDonInput.canlamsangs) {
                if (updateHoaDonInput.bhyt == true) {
                    thanhtien += canLamSang.thanhtien * 50 / 100;
                }
                else {
                    thanhtien += canLamSang.thanhtien;
                }
            }
        } */

        if (updateHoaDonInput?.vattuyte) {
            for (const vatTuYte of updateHoaDonInput.vattuyte) {
                if (updateHoaDonInput.bhyt == true) {
                    thanhtien += vatTuYte.thanhtien * 50 / 100;
                }
                else {
                    thanhtien += vatTuYte.thanhtien;
                }
            }
        }
        return await this.hoadonModel.findByIdAndUpdate(
            updateHoaDonInput.id,
            {
                $set: {
                    ...updateHoaDonInput, thanhtien
                }
            },
            { new: true }
        ).exec();
    }

    async updateTrangThaiHoaDon(id: string): Promise<Hoadon | null> {
        try {
            const hoadon = await this.hoadonModel.findById(id).exec();
            if (!hoadon) {
                throw new Error('User not found');
            }
            hoadon.trangthai = !hoadon.trangthai;
            return await hoadon.save();
        } catch (error) {
            throw new Error('Error xử lý khóa bị lỗi: ' + error.message);
        }
    }

    async deleteHoadon(_id: string): Promise<boolean> {
        const result = await this.hoadonModel.deleteOne({ _id }).exec();
        return result.deletedCount > 0;
    }
}
