import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BenhNhan } from './entities/benhnhan.entity';
import { Model } from 'mongoose';
import { UpdateBenhNhanInput } from './dto/update-benhnhan.input';
import { FetchPagination } from 'src/types/fetchPagination.input';
import { NewBenhNhanInput } from './dto/new-benhnhan.input';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { query } from 'express';

@Injectable()
export class BenhnhanService {
    constructor(@InjectModel(BenhNhan.name) private readonly benhnhanModel: Model<BenhNhan>
        , private readonly userService: UsersService) { }

    async getCount(): Promise<number> {
        const count = await this.benhnhanModel.countDocuments();
        return count
    }

    async getAllBenhNhan(fetchPagination: FetchPagination): Promise<BenhNhan[] | null> {
        let query = this.benhnhanModel.find().populate('user').sort({hoten: -1});
        if(fetchPagination.search){
            query = query.find({
                $text: {
                    $search: `'\"${fetchPagination.search}\"'`,
                    $language: "none",
                    $caseSensitive: false,
                    $diacriticSensitive: false,
                }
            })
        }
        const benhnhan = await query.skip(fetchPagination.skip).limit(fetchPagination.take).exec();
        return benhnhan;
    }

    async getAllBenhNhanNoPagination(): Promise<BenhNhan[] | null> {
        return await this.benhnhanModel.find().populate('user').exec();
    }

    async getBenhNhanbyId(_id: string): Promise<BenhNhan | null> {
        const benhNhan = await this.benhnhanModel.findOne({ _id }).populate('user').exec();
        return benhNhan;
    }

    /* async getBenhNhanbyHoten(hoten: string): Promise<BenhNhan[] | null> {
        try {
            return await this.benhnhanModel.find({ hoten: { $regex: hoten, $options: 'ui' } }).exec();
        } catch (error) {
            console.error("Error in getBenhNhanbyHoten:", error);
            return null;
        }
    } */

    async getBenhNhanbyUserId(user: string): Promise<BenhNhan | null> {
        return await this.benhnhanModel.findOne({ user: user }).populate('user').exec();
    }

    async getBenhNhanbySoDienThoai(sodienthoai: string): Promise<BenhNhan | null> {
        try{
            return (await this.benhnhanModel.findOne({ sodienthoai: sodienthoai }));
        }catch(error){
            return null
        }
    }

    async getBenhNhanbyHoten(hoten: string): Promise<BenhNhan[] | null> {
        try {
            return await this.benhnhanModel.find({
                $text: {
                    $search: `'\"${hoten}\"'`,
                    $language: "none",
                    $caseSensitive: false,
                    $diacriticSensitive: false,
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async updateUserbySoDienThoai(user: string, sodienthoai: string): Promise<BenhNhan | null> {
        try {
            const benhNhan = await this.getBenhNhanbySoDienThoai(sodienthoai);
            if (!benhNhan) {
                return null;
            }
            const updatedUser = await this.benhnhanModel.findByIdAndUpdate(benhNhan?._id, { user }, { new: true }).populate('user');
            return updatedUser;
        } catch (error) {
            console.error("Error updating user:", error);
            return null;
        }
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
