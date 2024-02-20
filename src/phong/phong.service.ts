import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Phong } from './schemas/phong.schema';
import { Model } from 'mongoose';
import { CreatePhongDto } from './dto/create-phong.dto';
import { UpdatePhongInput } from './dto/update-phong.input';
import { Schema as MongooseSchema } from "mongoose";

@Injectable()
export class PhongService {

    constructor(@InjectModel(Phong.name) private readonly phongModel: Model<Phong>){}


    async getAllPhong(): Promise<Phong[]>{
        return await this.phongModel.find().exec();
    }

    async createPhong(createPhongDto: CreatePhongDto): Promise<Phong | null>{
        const createPhong = await this.phongModel.create(createPhongDto);
        return createPhong;
    }


    async updatePhong(updatePhong: UpdatePhongInput): Promise<Phong|null>{
        return await this.phongModel.findByIdAndUpdate(
            updatePhong.id,
            {
                $set: {
                    ...updatePhong
                }
            },
            {new: true}
        ).exec();
    }

    async deletePhong(_id:string): Promise<void>{
        await this.phongModel.deleteOne({_id});
    }
}
