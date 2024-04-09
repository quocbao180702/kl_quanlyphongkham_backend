import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BenhNhan } from './entities/benhnhan.entity';
import { Model } from 'mongoose';
import { UpdateBenhNhanInput } from './dto/update-benhnhan.input';
import { FetchPagination } from 'src/types/fetchPagination.input';
import { NewBenhNhanInput } from './dto/new-benhnhan.input';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class BenhnhanService {
    constructor(@InjectModel(BenhNhan.name) private readonly benhnhanModel: Model<BenhNhan>
        , private readonly userService: UsersService) { }

    async getCount(): Promise<number> {
        const count = await this.benhnhanModel.countDocuments();
        return count
    }

    async getAllBenhNhan(fetchPagination: FetchPagination): Promise<BenhNhan[] | null> {
        return await this.benhnhanModel.find(null, null, {
            limit: fetchPagination.take,
            skip: fetchPagination.skip
        }).populate('user').exec();
    }

    async getAllBenhNhanNoPagination(): Promise<BenhNhan[] | null> {
        return await this.benhnhanModel.find().populate('user').exec();
    }

    async getBenhNhanbyId(_id: string): Promise<BenhNhan | null> {
        const benhNhan = await this.benhnhanModel.findOne({ _id }).populate('user').exec();
        return benhNhan;
    }

    async getBenhNhanbyUserId(user: string): Promise<BenhNhan | null> {
        return await this.benhnhanModel.findOne({ user: user }).populate('user').exec();
    }

    async getBenhNhanbySoDienThoai(sodienthoai: string): Promise<BenhNhan | null>{
        return (await this.benhnhanModel.findOne({sodienthoai: sodienthoai}));
    }


    async createBenhNhan(createBenhNhanDto: NewBenhNhanInput): Promise<BenhNhan | null> {
        try {
            if (createBenhNhanDto.username == "") {
                const createBenhNhan = (await this.benhnhanModel.create({ ...createBenhNhanDto, user: null })).populate('user');
                return createBenhNhan;
            }
            else {
                const user = await this.userService.getUserByUsername(createBenhNhanDto.username);
                if (user.thongtin == true) {
                    throw new Error('User đã có thông tin');
                }
                const createBenhNhan = (await this.benhnhanModel.create({ ...createBenhNhanDto, user: user._id })).populate('user');
                await this.userService.updateTrangThaiThongTinUser(user?._id.toString());
                return createBenhNhan;

            }

        } catch (error) {

        }
    }

    async updateBenhNhan(updateBenhNhan: UpdateBenhNhanInput): Promise<BenhNhan | null> {
        return await this.benhnhanModel.findByIdAndUpdate(
            updateBenhNhan._id,
            {
                $set: {
                    ...updateBenhNhan
                }
            },
            { new: true }
        ).exec();
    }

    async deleteBenhNhan(_id: string): Promise<void> {
        await this.benhnhanModel.deleteOne({ _id });
    }
}
