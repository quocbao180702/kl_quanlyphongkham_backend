import { Injectable } from '@nestjs/common';
import { CreateHoadonchidinhcanlamsangInput } from './dto/create-hoadonchidinhcanlamsang.input';
import { UpdateHoadonchidinhcanlamsangInput } from './dto/update-hoadonchidinhcanlamsang.input';
import { Hoadon } from 'src/hoadon/entities/hoadon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Hoadonchidinhcanlamsang } from './entities/hoadonchidinhcanlamsang.entity';
import { Model, Types } from 'mongoose';
import { MonthRangeCLS } from './dto/MonthRang';
import *  as moment from 'moment';
import { FetchPagination } from 'src/types/fetchPagination.input';
import { BenhnhanService } from 'src/benhnhan/benhnhan.service';

@Injectable()
export class HoadonchidinhcanlamsangService {
  constructor(@InjectModel(Hoadonchidinhcanlamsang.name) private readonly hoadonchidinhcanlamsanModel: Model<Hoadonchidinhcanlamsang>,
    private readonly benhNhanService: BenhnhanService) { }


  async createHoadonchidinhcanlamsang(createHoadonchidinhcanlamsang: CreateHoadonchidinhcanlamsangInput): Promise<Hoadonchidinhcanlamsang | null> {

    let thanhtien = 0
    if (createHoadonchidinhcanlamsang?.chitietcanlamsang) {
      for (const canLamSang of createHoadonchidinhcanlamsang.chitietcanlamsang) {
        if (createHoadonchidinhcanlamsang.bhyt == true) {
          thanhtien += canLamSang.thanhtien * 50 / 100;
        }
        else {
          thanhtien += canLamSang.thanhtien;
        }
      }
    }
    const created = await this.hoadonchidinhcanlamsanModel.create({ ...createHoadonchidinhcanlamsang, thanhtien });
    return created
  }


  async getTotalThanhTienByDate(start: Date, end: Date): Promise<number> {
    const startOfDay = new Date(start);
    startOfDay.setHours(0, 0, 0, 0);
    /* startOfDay.setHours(23, 59, 59, 999); */
    const endOfDay = new Date(end);
    endOfDay.setHours(23, 59, 59, 999);
    /*  endOfDay.setHours(0, 0, 0, 0); */


    const result = await this.hoadonchidinhcanlamsanModel.aggregate([
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

  async getTongTienbyMonthCLS(year: number): Promise<MonthRangeCLS[] | null> {
    let data: MonthRangeCLS[] = []
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

  async updateTinhTrangHoaDonCLS(id: string): Promise<Hoadonchidinhcanlamsang | null> {
    try {
      const hoadonchidinhcanlamsang = await this.hoadonchidinhcanlamsanModel.findById(id).exec();
      if (!hoadonchidinhcanlamsang) {
        throw new Error("Bill not found");
      }
      hoadonchidinhcanlamsang.tinhtrang = !hoadonchidinhcanlamsang.tinhtrang;
      return await hoadonchidinhcanlamsang.save();
    } catch (error) {
      throw new Error('Error xử lý thanh toán bị lỗi ' + error.message);
    }

  }


  async getAllHoaDonPhieuCanLamSang(fetchPagination: FetchPagination): Promise<Hoadonchidinhcanlamsang[]> {
    let query = this.hoadonchidinhcanlamsanModel.find().populate({
      path: 'benhnhan',
      populate: {
        path: 'user'
      }
    }).sort({ ngaytao: -1 });

    if (fetchPagination.search) {
      const searchBenhNhan = await this.benhNhanService.getBenhNhanbyHoten(fetchPagination.search);

      const idBenhNhan = searchBenhNhan?.map(benhnhan => benhnhan?._id.toString());

      if (idBenhNhan.length > 0) {
        query = query.find({ benhnhan: { $in: idBenhNhan } });
      }
      else{
        return []
      }
    }

    const hoadoncanlamsangs = await query.skip(fetchPagination.skip).limit(fetchPagination.take).exec();

    return hoadoncanlamsangs;
  }


  async getCount(): Promise<number> {
    const count = await this.hoadonchidinhcanlamsanModel.countDocuments();
    return count
  }

  async getAllHoaDonPhieuCanLamSangbyNgay(ngaykham: string): Promise<Hoadonchidinhcanlamsang[] | null> {
    const ngaykhamDate = new Date(ngaykham)
    return await this.hoadonchidinhcanlamsanModel.find({ ngaytao: { $gte: ngaykhamDate, $lt: new Date(ngaykhamDate.getTime() + 24 * 60 * 60 * 1000) } })
  }

}
