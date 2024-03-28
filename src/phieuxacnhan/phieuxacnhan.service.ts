import { Injectable } from '@nestjs/common';
import { CreatePhieuXacNhanInput } from './dto/create-phieuxacnhan.input';
import { UpdatePhieuXacNhanInput } from './dto/update-phieuxacnhan.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhieuXacNhan } from './entities/phieuxacnhan.entity';
import { Schema as MongooseSchema } from "mongoose";
import { get } from 'http';
import { count } from 'console';
import { TrangThaiKham } from 'src/types/trangthai-kham.types';

@Injectable()
export class PhieuXacNhanService {

  constructor(@InjectModel(PhieuXacNhan.name) private readonly phieuxacnhanModel: Model<PhieuXacNhan>) { }



  async getAllPhieuXacNhan(): Promise<PhieuXacNhan[] | null> {
    return await this.phieuxacnhanModel.find()
      .populate({
        path: 'benhnhan',
        populate: {
          path: 'user'
        }
      })
      .populate('phongs')
      .exec();
  }

  async getAllPhieuXacNhanDaXetNgiem(ngaykham: string, phong: string): Promise<PhieuXacNhan[] | null> {
    const ngayKhamDate = new Date(ngaykham);
    try {
      const phieuXacNhanDaXetNgiem = await this.phieuxacnhanModel.find({
        ngaykham: { $gte: ngayKhamDate, $lt: new Date(ngayKhamDate.getTime() + 24 * 60 * 60 * 1000) },
        'phongs': { $in: phong },
        trangthai: TrangThaiKham.DAXETNGHIEM
      })
        .populate({
          path: 'benhnhan',
          populate: {
            path: 'user'
          }
        }).populate('phongs');
      return phieuXacNhanDaXetNgiem;
    } catch (error) {
      console.error("Lỗi khi lấy tất cả các phiếu xác nhận đã xét nghiệm:", error);
      return;
    }
  }

  async getSoThuTu(ngaykham: string): Promise<number> {
    try {
      const phieus = await this.getPhieubyNgay(ngaykham);
      const sothutu = phieus.length > 0 ? phieus.length + 1 : 1;
      return sothutu;
    } catch (error) {
      console.error("Lỗi khi lấy số thứ tự phiếu khám bệnh:", error);
      return 0;
    }
  }



  async getPhieubyNgay(ngaykham: string): Promise<PhieuXacNhan[] | null> {
    try {
      const ngayKhamDate = new Date(ngaykham);
      return this.phieuxacnhanModel.find({ ngaykham: { $gte: ngayKhamDate, $lt: new Date(ngayKhamDate.getTime() + 24 * 60 * 60 * 1000) } }).exec();
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async getAllByNgayVaPhong(ngaykham: string, phong: string, trangthai: string): Promise<PhieuXacNhan[]> {
    const ngayKhamDate = new Date(ngaykham);

    return this.phieuxacnhanModel
      .find({
        ngaykham: { $gte: ngayKhamDate, $lt: new Date(ngayKhamDate.getTime() + 24 * 60 * 60 * 1000) },
        'phongs': { $in: phong },
        trangthai: trangthai
      })
      .populate({
        path: 'benhnhan',
        populate: {
          path: 'user'
        }
      })
      .populate('phongs')
      .exec();
  }


  async createPhieuXacNhan(createPhieuXacNhan: CreatePhieuXacNhanInput): Promise<PhieuXacNhan | null> {
    try {
      const sothutu = await this.getSoThuTu(createPhieuXacNhan.ngaykham.toString());
      const createdPhieuXacNhan = (await this.phieuxacnhanModel.create({ ...createPhieuXacNhan, sothutu })).populate({
        path: 'benhnhan',
        populate: {
          path: 'user'
        }
      });
      return createdPhieuXacNhan;
    } catch (error) {
      console.error("Lỗi khi tạo phiếu xác nhận:", error);
      return null;
    }
  }

  async updateTrangThaiKham(id: string, trangthai: string): Promise<PhieuXacNhan | null> {
    return await this.phieuxacnhanModel.findByIdAndUpdate(id, { trangthai: trangthai }).exec();
  }

  async updatePhieuXacNhan(updatePhieuXacNhan: UpdatePhieuXacNhanInput): Promise<PhieuXacNhan | null> {
    return await this.phieuxacnhanModel.findByIdAndUpdate(
      updatePhieuXacNhan.id,
      {
        $set: {
          ...updatePhieuXacNhan
        }
      },
      { new: true }
    ).exec();
  }

  async deletePhieuXacNhan(_id: string): Promise<void> {
    await this.phieuxacnhanModel.deleteOne({ _id });
  }
}
