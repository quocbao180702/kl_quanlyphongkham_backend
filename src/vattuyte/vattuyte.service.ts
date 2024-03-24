import { Injectable } from '@nestjs/common';
import { CreateVattuyteInput } from './dto/create-vattuyte.input';
import { UpdateVattuyteInput } from './dto/update-vattuyte.input';
import { InjectModel } from '@nestjs/mongoose';
import { Vattuyte } from './entities/vattuyte.entity';
import { Model } from 'mongoose';

@Injectable()
export class VattuyteService {

  constructor(@InjectModel(Vattuyte.name) private readonly vattuyteModel: Model<Vattuyte>) { }

  async getAllVatTuYTe(): Promise<Vattuyte[]> {
    return await this.vattuyteModel.find().exec();
  }

  async createVatTuYTe(createVattuyteInput: CreateVattuyteInput): Promise<Vattuyte | null> {
    const createVatTuYTe = await this.vattuyteModel.create(createVattuyteInput);
    return createVatTuYTe;
  }

  async updateVatTuYTe(updateVattuyteInput: UpdateVattuyteInput): Promise<Vattuyte | null> {
    return await this.vattuyteModel.findByIdAndUpdate(
      updateVattuyteInput.id,
      {
        $set: {
          ...updateVattuyteInput
        }
      },
      { new: true }
    ).exec();
  }

  async deleteVatTuYTe(_id: string): Promise<boolean> {
    const result = await this.vattuyteModel.deleteOne({ _id }).exec();
    return result.deletedCount > 0;
  }

}
