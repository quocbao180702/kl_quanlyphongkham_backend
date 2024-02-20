import { Injectable } from '@nestjs/common';
import { CreatePhieuchidinhcanlamsangInput } from './dto/create-phieuchidinhcanlamsang.input';
import { UpdatePhieuchidinhcanlamsangInput } from './dto/update-phieuchidinhcanlamsang.input';
import { InjectModel } from '@nestjs/mongoose';
import { Phieuchidinhcanlamsang } from './entities/phieuchidinhcanlamsang.entity';
import { Model } from 'mongoose';

@Injectable()
export class PhieuchidinhcanlamsangService {
  constructor(@InjectModel(Phieuchidinhcanlamsang.name) private readonly phieuCLSModel: Model<Phieuchidinhcanlamsang>){}

  async getAllPhieuCLS(): Promise<Phieuchidinhcanlamsang[] | null>{
    return await this.phieuCLSModel.find()
                  .populate('benhnhan')
                  .populate('bacsi')
                  .exec();
  }

  async createPhieuCLS(createPhieuCanLamSang: CreatePhieuchidinhcanlamsangInput): Promise<Phieuchidinhcanlamsang|null>{
    const createdPhieuCanLamSang = (await (await this.phieuCLSModel.create(createPhieuCanLamSang)).populate('benhnhan')).populate('bacsi');
    return createdPhieuCanLamSang;
  }

  async updatePhieuCLS(updatePhieuCanLamSang: UpdatePhieuchidinhcanlamsangInput): Promise<Phieuchidinhcanlamsang | null>{
    return await this.phieuCLSModel.findByIdAndUpdate(
      updatePhieuCanLamSang.id,
      {
        $set: {
          ...updatePhieuCanLamSang
        }
      },
      {new: true}
    ).exec();
  }

  async deletePhieuCLS(_id: string): Promise<void>{
    await this.phieuCLSModel.deleteOne({_id});
  }
}
