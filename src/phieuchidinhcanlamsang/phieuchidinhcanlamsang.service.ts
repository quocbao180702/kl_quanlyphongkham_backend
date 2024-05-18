import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreatePhieuchidinhcanlamsangInput } from './dto/create-phieuchidinhcanlamsang.input';
import { UpdatePhieuchidinhcanlamsangInput } from './dto/update-phieuchidinhcanlamsang.input';
import { InjectModel } from '@nestjs/mongoose';
import { Phieuchidinhcanlamsang } from './entities/phieuchidinhcanlamsang.entity';
import mongoose, { Model, Types } from 'mongoose';
import { KetquacanlamsangService } from 'src/ketquacanlamsang/ketquacanlamsang.service';
import { CreateKetquacanlamsangInput } from 'src/ketquacanlamsang/dto/create-ketquacanlamsang.input';
import { Schema as MongooSchemas } from 'mongoose';
import { ObjectId } from 'mongodb';
/* import { PhieuXacNhanService } from 'src/phieuxacnhan/PhieuXacNhan.service'; */
import { PhieuXacNhanService } from 'src/phieuxacnhan/phieuxacnhan.service';
import { TrangThaiKham } from 'src/types/trangthai-kham.types';
import { TrangThaiCLS } from './dto/trangthaiCLS';

@Injectable()
export class PhieuchidinhcanlamsangService {
  constructor(@InjectModel(Phieuchidinhcanlamsang.name) private readonly phieuCLSModel: Model<Phieuchidinhcanlamsang>,
    private readonly KetquacanlamsangService: KetquacanlamsangService,
    @Inject(forwardRef(() => PhieuXacNhanService))
    private PhieuXacNhanService: PhieuXacNhanService,) { }

  async getAllPhieuCLS(): Promise<Phieuchidinhcanlamsang[] | null> {
    return await this.phieuCLSModel.find()
      .populate({
        path: 'benhnhan',
        populate: {
          path: 'user'
        }
      })
      .populate({
        path: 'bacsi',
        populate: {
          path: 'user'
        }
      })
      .populate({
        path: 'ketquacanlamsangs',
        populate: {
          path: 'loaicanlamsang'
        }
      })
      .exec();
  }

  async getPhieuCanLamSangbyPhieuXacNhanId(phieuxacnhan: string): Promise<Phieuchidinhcanlamsang | null> {
    try {
      const phieuCLS = await this.phieuCLSModel.findOne({ phieuxacnhan: phieuxacnhan })
        .populate({
          path: 'benhnhan',
          populate: {
            path: 'user'
          }
        })
        .populate({
          path: 'bacsi',
          populate: {
            path: 'user'
          }
        })
        .populate({
          path: 'ketquacanlamsangs',
          populate: {
            path: 'loaicanlamsang'
          }
        })
        .exec();

      return phieuCLS;
    } catch (error) {
      console.error("Lỗi khi lấy phiếu cận lâm sàng:", error);
      return null;
    }
  }


  async getAllPhieuCLSbyNgay(ngaytao: Date, trangthai: String): Promise<Phieuchidinhcanlamsang[] | null> {
    return await this.phieuCLSModel.find({ ngaytao, trangthai })
      .populate({
        path: 'benhnhan',
        populate: {
          path: 'user'
        }
      })
      .populate({
        path: 'bacsi',
        populate: {
          path: 'user'
        }
      })
      .populate({
        path: 'ketquacanlamsangs',
        populate: {
          path: 'loaicanlamsang'
        }
      }).sort({truoc: 1, ngaytao: 1})
      .exec();
  }

  async createPhieuCLS(
    createPhieuCanLamSang: CreatePhieuchidinhcanlamsangInput,
    createKetQuaCLSList: CreateKetquacanlamsangInput[],
  ): Promise<Phieuchidinhcanlamsang | null> {
    try {
      const createdKetQuaCLSList = await Promise.all(
        createKetQuaCLSList.map(createKetQuaCLS =>
          this.KetquacanlamsangService.createKetQuaCLS(createKetQuaCLS),
        ),
      );

      const ketQuaIds = createdKetQuaCLSList.map(ketQua => ketQua._id.toString());
      const ketQuaObjectIds = ketQuaIds.map(id => new ObjectId(id));
      
      const newPhieuCanLamSang = await this.phieuCLSModel.create({
        ...createPhieuCanLamSang,
        ketquacanlamsangs: ketQuaObjectIds
      });
      const createdPhieuCanLamSang = await this.phieuCLSModel
        .findById(newPhieuCanLamSang?._id)
        .populate({
          path: 'ketquacanlamsangs',
          populate: {
            path: 'loaicanlamsang'
          }
        })

      return createdPhieuCanLamSang;
    } catch (error) {
      console.error('Lỗi khi tạo phiếu chỉ định cận lâm sàng:', error);
      return null;
    }
  }


  async updatePhieuCLS(updatePhieuCanLamSang: UpdatePhieuchidinhcanlamsangInput): Promise<Phieuchidinhcanlamsang | null> {
    return await this.phieuCLSModel.findByIdAndUpdate(
      updatePhieuCanLamSang.id,
      {
        $set: {
          ...updatePhieuCanLamSang
        }
      },
      { new: true }
    ).exec();
  }

  async updateTrangThaiCanLamSang(id: string, trangthai: string): Promise<Phieuchidinhcanlamsang | null> {
    try {
      const update = await this.phieuCLSModel.findByIdAndUpdate(id, { trangthai: trangthai }, { new: true }).exec();
      if (update?.trangthai === TrangThaiCLS.DAXETNGHIEM) {
        const trangthai = TrangThaiKham.DAXETNGHIEM;
        const updatePhieuXacNhan = await this.PhieuXacNhanService.updateTrangThaiKham(update.phieuxacnhan.toString(), trangthai);
      }
      else {
        const trangthai = TrangThaiKham.CHOXETNGIEM;
        const updatePhieuXacNhan = await this.PhieuXacNhanService.updateTrangThaiKham(update.phieuxacnhan.toString(), trangthai);
      }
      return update;
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      return null;
    }
  }

  async updateUuTien(id: string): Promise<Phieuchidinhcanlamsang | null>{
    try{
      const phieucls = await this.phieuCLSModel.findById(id).exec();
      if(!phieucls){
        throw new Error('Error');
      }
      phieucls.truoc = !phieucls.truoc;
      return await phieucls.save();
    }catch(error){
      throw new Error('Error xử lý khóa bị lỗi: ' + error.message)
    }

  }


  async deletePhieuCLS(_id: string): Promise<void> {
    await this.phieuCLSModel.deleteOne({ _id });
  }
}
