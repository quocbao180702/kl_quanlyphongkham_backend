import { Injectable } from '@nestjs/common';
import { CreateKetquacanlamsangInput } from './dto/create-ketquacanlamsang.input';
import { UpdateKetquacanlamsangInput } from './dto/update-ketquacanlamsang.input';
import { InjectModel } from '@nestjs/mongoose';
import { KetQuaCanLamSang } from './entities/ketquacanlamsang.entity';
import { Model } from 'mongoose';

@Injectable()
export class KetquacanlamsangService {
  constructor(@InjectModel(KetQuaCanLamSang.name) private readonly KetQuaCanLamSangModel: Model<KetQuaCanLamSang>) { }

  async createKetQuaCLS(createKetQuaCLS: CreateKetquacanlamsangInput): Promise<KetQuaCanLamSang | null> {
    const createdKetQuaCLS = await this.KetQuaCanLamSangModel.create(createKetQuaCLS);
    return createdKetQuaCLS;
  }

  async updateKetQuaCLS(updateKetQuaCLS: UpdateKetquacanlamsangInput): Promise<KetQuaCanLamSang | null> {
    return await this.KetQuaCanLamSangModel.findByIdAndUpdate(
      updateKetQuaCLS.id,
      {
        $set: {
          ...updateKetQuaCLS
        }
      },
      { new: true }
    ).exec();
  }


  async findAllRelatedKetQuaCanLamSang(ketQuaIds: string[]): Promise<KetQuaCanLamSang[] | null> {
    const ketQuaList = await this.KetQuaCanLamSangModel.find({
      _id: { $in: ketQuaIds }
    }).populate('loaicanlamsang');
    return ketQuaList;
  }
}
