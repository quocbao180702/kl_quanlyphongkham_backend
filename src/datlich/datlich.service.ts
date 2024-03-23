import { Injectable } from '@nestjs/common';
import { DatLich } from './entities/datlich.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateDatLichInput } from './dto/update-datlich.input';
import { NewDatLichInput } from './dto/new-datlich.input';

@Injectable()
export class DatlichService {

    constructor(@InjectModel(DatLich.name) private readonly datLichModel: Model<DatLich>) { }


    async getAllDatLich(): Promise<DatLich[] | null> {
        return await this.datLichModel.find()
            .populate({
                path: 'benhnhan',
                populate: {
                    path: 'user'
                }
            })
            .exec();
    }

    async createDatLich(createDatLich: NewDatLichInput): Promise<DatLich> {
        const createdDatLich = (await this.datLichModel.create(createDatLich)).populate({
            path: 'benhnhan',
            populate: {
                path: 'user'
            }
        });
        return createdDatLich;
    }

    async updateDatLich(updateDatLich: UpdateDatLichInput): Promise<DatLich | null> {
        return await this.datLichModel.findByIdAndUpdate(
            updateDatLich.id,
            {
                $set: {
                    ...updateDatLich
                }
            },
            { new: true }
        ).populate('benhnhan').exec();
    }

    async deleteDatLich(_id: string): Promise<void> {
        await this.datLichModel.deleteOne({ _id });
    }
}
