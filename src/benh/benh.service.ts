import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Benh } from './schemas/benh.schema';
import { Model } from 'mongoose';
import { CreateBenhInput } from './dto/create-benh.dto';
import { UpdateBenhInput } from './dto/update-benh.input';

@Injectable()
export class BenhService {
    constructor(@InjectModel(Benh.name) private readonly benhModel: Model<Benh>){}

    
    async getAllBenh(): Promise<Benh[]>{
        return await this.benhModel.find().exec();
    }

    async createBenh(createBenhDto: CreateBenhInput): Promise<Benh | null>{
        const createBenh = await this.benhModel.create(createBenhDto);
        return createBenh;
    }


    async updateBenh(updateBenhInput: UpdateBenhInput): Promise<Benh|null>{
        return await this.benhModel.findByIdAndUpdate(
            updateBenhInput.id,
            {
                $set: {
                    ...updateBenhInput
                }
            },
            {new: true}
        ).exec();
    }

    async deleteBenh(_id: string): Promise<void>{
        await this.benhModel.deleteOne({_id});
    }

}
