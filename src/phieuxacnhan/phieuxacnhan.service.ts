import { Injectable } from '@nestjs/common';
import { CreatePhieuXacNhanInput } from './dto/create-phieuxacnhan.input';
import { UpdatePhieuXacNhanInput } from './dto/update-phieuxacnhan.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhieuXacNhan } from './entities/phieuxacnhan.entity';
import { TrangThaiKham } from 'src/types/trangthai-kham.types';
import { MailService } from 'src/mail/mail.service';
import * as moment from "moment";
import { MonthRange } from './dto/monthRange';

@Injectable()
export class PhieuXacNhanService {

  constructor(@InjectModel(PhieuXacNhan.name) private readonly phieuxacnhanModel: Model<PhieuXacNhan>,
    private readonly mailService: MailService) { }



  async getAllPhieuXacNhan(): Promise<PhieuXacNhan[] | null> {
    return await this.phieuxacnhanModel.find()
      .populate({
        path: 'benhnhan',
        populate: {
          path: 'user'
        }
      })
      .populate('phongs')
      .sort({ 'phien.batdau': 1 })
      .exec();
  }

  async countPhieuXacNhanByDate(start: Date, end: Date): Promise<number> {
    const startOfDay = new Date(start);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(end);
    endOfDay.setHours(23, 59, 59, 999);

    const count = await this.phieuxacnhanModel.countDocuments({
      ngaykham: { $gte: startOfDay, $lte: endOfDay },
    });

    return count;
  }

  async getStartAndEndOfMonth(year: number): Promise<MonthRange[]> {
    let data: MonthRange[] = [];
    for (let i = 1; i < 13; i++) {
      const startDate = moment([year, i - 1]).startOf('month').toDate();
      const endDate = moment([year, i - 1]).endOf('month').toDate();

      const count = await this.countPhieuXacNhanByDate(startDate, endDate);
      data.push({
        month: i,
        count: count
      });
    }

    return data;
  }

  /* async getAllPhieuXacNhanDaXetNgiem(ngaykham: string, phong: string): Promise<PhieuXacNhan[] | null> {
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
  } */
  async getAllPhieuXacNhanDaXetNgiem(ngaykham: string, phong: string): Promise<PhieuXacNhan[] | null> {
    const ngayKhamDate = new Date(ngaykham);
    try {
      let query = this.phieuxacnhanModel.find({
        ngaykham: { $gte: ngayKhamDate, $lt: new Date(ngayKhamDate.getTime() + 24 * 60 * 60 * 1000) },
        trangthai: TrangThaiKham.DAXETNGHIEM
      }).populate({
        path: 'benhnhan',
        populate: {
          path: 'user'
        }
      }).sort({ 'phien.batdau': 1 });

      // Kiểm tra xem phong có tồn tại và không phải là chuỗi rỗng
      if (phong && phong.length > 0) {
        query = query.populate('phongs');
      }

      const phieuXacNhanDaXetNgiem = await query.sort({ 'phien.batdau': 1 }).exec();
      return phieuXacNhanDaXetNgiem;
    } catch (error) {
      console.error("Lỗi khi lấy tất cả các phiếu xác nhận đã xét nghiệm:", error);
      return null;
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
      ngayKhamDate.setUTCHours(0, 0, 0, 0);
      const nextDay = new Date(ngayKhamDate);
      nextDay.setUTCDate(ngayKhamDate.getUTCDate() + 1);
      return this.phieuxacnhanModel.find({
        ngaykham: { $gte: ngayKhamDate, $lt: nextDay }
      }).sort({ 'phien.batdau': 1 }).exec();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getAllPhieuXacNhanbyIdBenhNhan(idBenhNhan: string): Promise<PhieuXacNhan[] | null> {
    return await this.phieuxacnhanModel.find({ benhnhan: idBenhNhan })
      .populate({
        path: 'benhnhan',
        populate: {
          path: 'user'
        }
      })
      .populate('phongs')
      .sort({ 'ngaykham': -1 })
      .exec();
  }

  /* async getAllByNgayVaPhong(ngaykham: string, phong: string, trangthai: string): Promise<PhieuXacNhan[]> {
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
  } */

  /* async getAllByNgayVaPhong(ngaykham: string, phong: string, trangthai: string): Promise<PhieuXacNhan[]> {
    const ngayKhamDate = new Date(ngaykham);

    if (phong === "") {
      return [];
    }

    let query = this.phieuxacnhanModel.find({
      ngaykham: { $gte: ngayKhamDate, $lt: new Date(ngayKhamDate.getTime() + 24 * 60 * 60 * 1000) },
      phongs: { $in: phong },
      trangthai: trangthai
    }).populate({
      path: 'benhnhan',
      populate: {
        path: 'user'
      }
    }).sort({ 'phien.batdau': 1 });

    // Kiểm tra xem phong có tồn tại và không phải là chuỗi rỗng
    if (phong && phong.length > 0) {
      query = query.populate('phongs');
    }

    return query.exec();
  } */

  async getAllByNgayVaPhong(ngaykham: string, phong: string, trangthai: string): Promise<PhieuXacNhan[]> {
    const ngayKhamDate = new Date(ngaykham);

    if (!phong) {
      return [];
    }

    let query = this.phieuxacnhanModel.find({
      ngaykham: {
        $gte: ngayKhamDate,
        $lt: new Date(ngayKhamDate.getTime() + 24 * 60 * 60 * 1000)
      },
      phongs: {
        $in: [phong]
      },
      trangthai: trangthai
    })
    .populate({
      path: 'benhnhan',
      populate: {
        path: 'user'
      }
    })
    .sort({
      'phien.batdau': 1
    });

    if (phong && phong.length > 0) {
      query = query.populate('phongs');
    }

    const results = await query.exec();
    return results.filter(phieu => phieu.benhnhan !== null);
}


  async createPhieuXacNhan(createPhieuXacNhan: CreatePhieuXacNhanInput): Promise<PhieuXacNhan | null> {
    try {
      const sothutu = await this.getSoThuTu(createPhieuXacNhan.ngaykham.toString());
      const createdPhieuXacNhan = (await this.phieuxacnhanModel.create({ ...createPhieuXacNhan, sothutu })).populate([{
        path: 'benhnhan',
        populate: {
          path: 'user'
        }
      }, { path: 'phongs' }]);
      if (createPhieuXacNhan.email) {
        await this.mailService.guiMailPhieuXacNhan({
          email: createPhieuXacNhan.email,
          subject: "Phiếu Xác Nhận Đặt Thành Công",
          template: "./phieuxacnhan_mail",
          name: "Phòng Khám Đa Khoa",
          content: createPhieuXacNhan.phien.batdau.toString()
        });
      }
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
