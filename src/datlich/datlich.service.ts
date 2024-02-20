import { Injectable } from '@nestjs/common';
import { DatLich } from './schemas/datlich.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDatLichDto } from './dto/create-datlich.dto';
import { UpdateDatLichInput } from './dto/update-datlich.input';

@Injectable()
export class DatlichService {

    constructor(@InjectModel(DatLich.name) private readonly datLichModel: Model<DatLich>){}


    async getAllDatLich(): Promise<DatLich[] |null>{
        return await this.datLichModel.find()
                    .populate('benhnhans')
                    .exec();
    }

    async createDatLich(createDatLich: CreateDatLichDto): Promise<DatLich|null>{
        const createdDatLich = (await this.datLichModel.create(createDatLich)).populate('benhnhans');
        return createdDatLich;
    }

    async updateDatLich(updateDatLich: UpdateDatLichInput): Promise<DatLich|null>{
        return await this.datLichModel.findByIdAndUpdate(
            updateDatLich.id,
            {
                $set: {
                    ...updateDatLich
                }
            },
            {new: true}
        ).exec();
    }

    async deleteDatLich(_id: string): Promise<void>{
        await this.datLichModel.deleteOne({_id});
    }
}
