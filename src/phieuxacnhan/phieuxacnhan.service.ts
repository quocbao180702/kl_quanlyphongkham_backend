import { Injectable } from '@nestjs/common';
import { CreatePhieuXacNhanInput } from './dto/create-phieuxacnhan.input';
import { UpdatePhieuXacNhanInput } from './dto/update-phieuxacnhan.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhieuXacNhan } from './schemas/PhieuXacNhan.schema';
import { Schema as MongooseSchema } from "mongoose";

@Injectable()
export class PhieuXacNhanService {

  constructor(@InjectModel(PhieuXacNhan.name) private readonly phieuxacnhanModel: Model<PhieuXacNhan>) { }


  async getAllPhieuXacNhan(): Promise<PhieuXacNhan[] | null> {
    return await this.phieuxacnhanModel.find()
                        .populate('benhnhans')
                        .populate('phongs')
                        .exec();
  }

  async createPhieuXacNhan(createPhieuXacNhan: CreatePhieuXacNhanInput): Promise<PhieuXacNhan | null> {
    const createdPhieuXacNhan = await this.phieuxacnhanModel.create(createPhieuXacNhan);
    return createdPhieuXacNhan;
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

  async deletePhieuXacNhan(_id:string): Promise<void> {
    await this.phieuxacnhanModel.deleteOne({ _id });
  }
}
