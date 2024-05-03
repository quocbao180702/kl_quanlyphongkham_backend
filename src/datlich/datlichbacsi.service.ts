import { Injectable } from "@nestjs/common";
import { DatLichBacSi } from "./entities/datlicbacsi.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import path from "path";
import { BenhnhanService } from "src/benhnhan/benhnhan.service";
import { NewDatLichBacSiInput } from "./dto/new-datlichBacSi.input";
import { UpdateDatLichBacSiInput } from "./dto/update-datlichbacsi.input";
import { TrangThaiDatKham } from "src/types/trangthai-datkham-types";

@Injectable()
export class DatLichBacSiService {

    constructor(@InjectModel(DatLichBacSi.name) private readonly datlichBacSiModel: Model<DatLichBacSi>,
        private readonly benhNhanService: BenhnhanService) { }


    async getAllDatLichBacSi(): Promise<DatLichBacSi[] | null> {
        return await this.datlichBacSiModel.find().populate({
            path: 'benhnhan',
            populate: {
                path: 'user'
            }
        }).populate({
            path: 'bacsi',
            populate: [{
                path: 'chuyenkhoa',
            }, {
                path: 'phongs'
            }]
        }).exec();
    }

    async getAllDatLichBacSiByTrangThai(trangthai: string): Promise<DatLichBacSi[] | null> {
        return await this.datlichBacSiModel.find({ trangthai: trangthai }).populate({
            path: 'benhnhan',
            populate: {
                path: 'user'
            }
        }).populate({
            path: 'bacsi',
            populate: [{
                path: 'chuyenkhoa',
            }, {
                path: 'phongs'
            }]
        }).exec();
    }


    async createDatlichBacSi(createDatLichBacSi: NewDatLichBacSiInput): Promise<DatLichBacSi | null> {
        const getBenhNhan = await this.benhNhanService.getBenhNhanbySoDienThoai(createDatLichBacSi.sodienthoai);
        if (getBenhNhan) {
            const createdDatlicBacSi = (await (await this.datlichBacSiModel.create({ ...createDatLichBacSi, benhnhan: getBenhNhan?._id })).populate('benhnhan')).populate('bacsi');
            return createdDatlicBacSi;
        }
        else {
            return null
        }
    }

    async updateDatLichBacSi(updateDatLich: UpdateDatLichBacSiInput): Promise<DatLichBacSi | null> {
        return await this.datlichBacSiModel.findByIdAndUpdate(
            updateDatLich.id,
            {
                $set: {
                    ...updateDatLich
                }
            },
            { new: true }
        ).populate('benhnhan').populate('bacsi').exec();
    }

    async updateTrangThaiDatLichBacSi(id: string, trangthai: string): Promise<DatLichBacSi | null> {

        try {
            const updatedDatLich = await this.datlichBacSiModel.findByIdAndUpdate(id, { trangthai }, { new: true });
            return updatedDatLich;
        } catch (error) {
            console.error(error);
            return null;
        }
    }


    async deleteDatLichBacSi(_id: string): Promise<boolean> {
        const result = await this.datlichBacSiModel.deleteOne({ _id }).exec();
        return result.deletedCount > 0
    }

}