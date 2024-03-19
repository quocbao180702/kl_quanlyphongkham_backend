import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BacSi } from './entities/bacsi.entity';
import { Model, MongooseError } from 'mongoose';
import { UpdateBacSiInput } from './dto/update-bacsi.input';
import { UsersService } from 'src/users/users.service';
import { ObjectId } from 'mongodb';
import { NewBacSiInput } from './dto/new-bacsi.input';
import { FetchPagination } from 'src/types/fetchPagination.input';

@Injectable()
export class BacsiService {
    constructor(@InjectModel(BacSi.name) private readonly bacsiModel: Model<BacSi>,
        private readonly usersService: UsersService) { }


    async getCount(): Promise<number> {
        const count = await this.bacsiModel.countDocuments();
        return count
    }

    async getAllBacSi(fetchPagination: FetchPagination): Promise<BacSi[]> {
        return await this.bacsiModel.find(null, null, { limit: fetchPagination.take, skip: fetchPagination.skip }).populate('user').populate('phongs').populate('chuyenkhoa').exec();
    }

    async createBacSi(createBacSiDto: NewBacSiInput): Promise<BacSi | null> {
        try {
            /* const user = await this.usersService.getUserByUsername(createBacSiDto.username);
            if (!user) {
                throw new Error('User with the provided username not found');
            }
            console.log(user._id.toString()) */
            const newBacSi = await this.bacsiModel.create(createBacSiDto);
            const createdBacSi = await this.bacsiModel
                .findById(newBacSi._id)
                .populate('user')
                .populate('phongs')
                .populate('chuyenkhoa')
                .exec();
            return createdBacSi;
        } catch (error) {
            throw error;
        }
    }



    async updateBacSi(updateBacSi: UpdateBacSiInput): Promise<BacSi | null> {
        return await this.bacsiModel.findByIdAndUpdate(
            updateBacSi.id,
            {
                $set: {
                    ...updateBacSi
                }
            },
            { new: true }
        ).exec();
    }

    async deleteBacSi(_id: string): Promise<void> {
        await this.bacsiModel.deleteOne({ _id });
    }


}
