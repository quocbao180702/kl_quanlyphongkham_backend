import { Injectable } from '@nestjs/common';
import { CreatePhieuchidinhcanlamsangInput } from './dto/create-phieuchidinhcanlamsang.input';
import { UpdatePhieuchidinhcanlamsangInput } from './dto/update-phieuchidinhcanlamsang.input';
import { InjectModel } from '@nestjs/mongoose';
import { Phieuchidinhcanlamsang } from './entities/phieuchidinhcanlamsang.entity';
import mongoose, { Model, Types } from 'mongoose';
import { KetquacanlamsangService } from 'src/ketquacanlamsang/ketquacanlamsang.service';
import { CreateKetquacanlamsangInput } from 'src/ketquacanlamsang/dto/create-ketquacanlamsang.input';
import { Schema as MongooSchemas } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class PhieuchidinhcanlamsangService {
  constructor(@InjectModel(Phieuchidinhcanlamsang.name) private readonly phieuCLSModel: Model<Phieuchidinhcanlamsang>,
    private readonly KetquacanlamsangService: KetquacanlamsangService,) { }

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


  async getAllPhieuCLSbyNgay(ngaytao: Date): Promise<Phieuchidinhcanlamsang[] | null> {
    return await this.phieuCLSModel.find({ ngaytao })
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

      const createdPhieuCanLamSang = await this.phieuCLSModel.create({
        ...createPhieuCanLamSang,
        ketquacanlamsangs: ketQuaObjectIds
      });

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

  async deletePhieuCLS(_id: string): Promise<void> {
    await this.phieuCLSModel.deleteOne({ _id });
  }
}
