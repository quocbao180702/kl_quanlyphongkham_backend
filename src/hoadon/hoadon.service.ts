import { Injectable } from '@nestjs/common';
import { CreateHoadonInput } from './dto/create-hoadon.input';
import { UpdateHoadonInput } from './dto/update-hoadon.input';
import { InjectModel } from '@nestjs/mongoose';
import { Hoadon } from './entities/hoadon.entity';
import { Model } from 'mongoose';

@Injectable()
export class HoadonService {
  constructor(@InjectModel(Hoadon.name) private readonly hoadonModel: Model<Hoadon>){}

    
  async getAllHoadon(): Promise<Hoadon[]>{
      return await this.hoadonModel.find()
                    .populate('benhnhan')
                    .populate('thuocs')
                    .populate('canlamsangs')
                    .populate('dichvus')
                    .exec();
  }

  async createHoaDon(createHoadonInput: CreateHoadonInput): Promise<Hoadon | null>{
      const createHoaDon = await this.hoadonModel.create(createHoadonInput);
      return createHoaDon;
  }


  async updateHoaDon(updateHoaDonInput: UpdateHoadonInput): Promise<Hoadon|null>{
      return await this.hoadonModel.findByIdAndUpdate(
        updateHoaDonInput.id,
          {
              $set: {
                  ...updateHoaDonInput
              }
          },
          {new: true}
      ).exec();
  }

  async deleteHoadon(_id: string): Promise<void>{
      await this.hoadonModel.deleteOne({_id});
  }
}
