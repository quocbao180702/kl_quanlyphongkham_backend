import { Injectable } from '@nestjs/common';
import { CreateHoadonInput } from './dto/create-hoadon.input';
import { UpdateHoadonInput } from './dto/update-hoadon.input';
import { InjectModel } from '@nestjs/mongoose';
import { Hoadon } from './entities/hoadon.entity';
import { Model } from 'mongoose';
import { MongthRange } from './dto/monthRange';
import * as moment from 'moment';
import { FetchPagination } from 'src/types/fetchPagination.input';
import { BenhnhanService } from 'src/benhnhan/benhnhan.service';

@Injectable()
export class HoadonService {
    constructor(@InjectModel(Hoadon.name) private readonly hoadonModel: Model<Hoadon>,
        private readonly benhnhanService: BenhnhanService) { }


    async getCount(): Promise<number> {
        const count = await this.hoadonModel.countDocuments();
        return count
    }

    async getAllHoadon(fetchPagination: FetchPagination): Promise<Hoadon[]> {
        const ngaykhamDate = new Date(fetchPagination.search);
        let query = this.hoadonModel.find().populate('benhnhan').sort({ ngaytao: -1 });

        if (fetchPagination.search) {
            const searchBenhNhan = await this.benhnhanService.getBenhNhanbyHoten(fetchPagination.search);
            const idBenhNhan = searchBenhNhan?.map(benhnhan => benhnhan?._id.toString());
            if (idBenhNhan.length > 0) {
                query = query.find({ benhnhan: { $in: idBenhNhan } });
            }
            else {
                return []
            }
        }

        const hoadons = await query.skip(fetchPagination.skip).limit(fetchPagination.take).exec();
        return hoadons;
    }


    async getHoaDonbyNgay(ngaykham: string): Promise<Hoadon[] | null> {
        const ngaykhamDate = new Date(ngaykham);

        return await this.hoadonModel.find({ ngaytao: { $gte: ngaykhamDate, $lt: new Date(ngaykhamDate.getTime() + 24 * 60 * 60 * 1000) }, }).populate('benhnhan').exec();
    }

    async getTotalThanhTienByDate(start: Date, end: Date): Promise<number> {
        const startOfDay = new Date(start);
        /*  startOfDay.setHours(0, 0, 0, 0); */
        /* startOfDay.setHours(23, 59, 59, 999); */
        const endOfDay = new Date(end);
        /*  endOfDay.setHours(23, 59, 59, 999); */
        /*  endOfDay.setHours(0, 0, 0, 0); */


        const result = await this.hoadonModel.aggregate([
            {
                $match: {
                    ngaytao: { $gte: startOfDay, $lte: endOfDay },
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$thanhtien' },
                },
            },
        ]);

        return result.length > 0 ? result[0].total : 0;
    }

    async getTongTienbyMonth(year: number): Promise<MongthRange[] | null> {
        let data: MongthRange[] = []
        for (let i = 1; i < 13; i++) {
            const startDate = moment([year, i - 1]).startOf('month').toDate();
            const endDate = moment([year, i - 1]).endOf('month').toDate();

            const tongtien = await this.getTotalThanhTienByDate(startDate, endDate);
            data.push({
                month: i,
                tongtien: tongtien
            })
        }
        return data
    }

    async getAllHoadonByBenhNhan(benhnhanId): Promise<Hoadon[]> {
        return await this.hoadonModel.find({ benhnhan: benhnhanId }).populate('benhnhan').exec();
    }

    async createHoaDon(createHoadonInput: CreateHoadonInput): Promise<Hoadon | null> {
        let thanhtien = 0;
        if (createHoadonInput.bhyt == true) {
            thanhtien = thanhtien + 150000;
        }
        else {
            thanhtien = thanhtien + 150000
        }
        const createHoaDon = (await this.hoadonModel.create({ ...createHoadonInput, thanhtien })).populate('benhnhan');
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
