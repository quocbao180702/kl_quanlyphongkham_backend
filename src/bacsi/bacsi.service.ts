import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BacSi } from './entities/bacsi.entity';
import { Model } from 'mongoose';
import { CreateBacSiDto } from './dto/create-bacsi.dto';
import { UpdateBacSiInput } from './dto/update-bacsi.input';

@Injectable()
export class BacsiService {
    constructor(@InjectModel(BacSi.name) private readonly bacsiModel: Model<BacSi>){}

    async getAllBacSi(): Promise<BacSi[]>{
        return await this.bacsiModel.find().populate('user').populate('phongs').populate('chuyenkhoa').exec();
    }

    async createBacSi(createBacSiDto: CreateBacSiDto): Promise<BacSi | null>{
        const createBacSi = (await (await (await this.bacsiModel.create(createBacSiDto)).populate('user')).populate('phongs')).populate('chuyenkhoa');
        return createBacSi;
    }


    async updateBacSi(_id: string, updateBacSi: UpdateBacSiInput): Promise<BacSi|null>{
        return await this.bacsiModel.findByIdAndUpdate(
            _id,
            {
                $set: {
                    ...updateBacSi
                }
            },
            {new: true}
        ).exec();
    }

    async deleteBacSi(_id: string): Promise<void>{
        await this.bacsiModel.deleteOne({_id});
    }


}
