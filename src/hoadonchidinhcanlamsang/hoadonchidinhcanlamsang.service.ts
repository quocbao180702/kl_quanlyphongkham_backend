import { Injectable } from '@nestjs/common';
import { CreateHoadonchidinhcanlamsangInput } from './dto/create-hoadonchidinhcanlamsang.input';
import { UpdateHoadonchidinhcanlamsangInput } from './dto/update-hoadonchidinhcanlamsang.input';
import { Hoadon } from 'src/hoadon/entities/hoadon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Hoadonchidinhcanlamsang } from './entities/hoadonchidinhcanlamsang.entity';
import { Model } from 'mongoose';

@Injectable()
export class HoadonchidinhcanlamsangService {
  constructor(@InjectModel(Hoadonchidinhcanlamsang.name) private readonly hoadonchidinhcanlamsanModel: Model<Hoadonchidinhcanlamsang>) { }


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

  async updateTinhTrangHoaDonCLS(id: string): Promise<Hoadonchidinhcanlamsang | null>{
    try{
      const hoadonchidinhcanlamsang = await this.hoadonchidinhcanlamsanModel.findById(id).exec();
      if(!hoadonchidinhcanlamsang){
        throw new Error("Bill not found");
      }
      hoadonchidinhcanlamsang.tinhtrang = !hoadonchidinhcanlamsang.tinhtrang;
      return await hoadonchidinhcanlamsang.save();
    }catch(error){
      throw new Error('Error xử lý thanh toán bị lỗi ' + error.message);
    }

  }


  async getAllHoaDonPhieuCanLamSang(): Promise<Hoadonchidinhcanlamsang[]> {
    return await this.hoadonchidinhcanlamsanModel.find().populate({
      path: 'benhnhan',
      populate: {
        path: 'user'
      }
    }).exec();
  }

}
