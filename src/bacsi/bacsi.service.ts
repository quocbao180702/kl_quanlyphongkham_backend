import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BacSi } from './entities/bacsi.entity';
import { Model, MongooseError } from 'mongoose';
import { UpdateBacSiInput } from './dto/update-bacsi.input';
import { UsersService } from 'src/users/users.service';
import { ObjectId } from 'mongodb';
import { NewBacSiInput } from './dto/new-bacsi.input';
import { FetchPagination } from 'src/types/fetchPagination.input';
import { CreateLichkhamInput } from 'src/lichkham/dto/create-lichkham.input';
import { LichkhamService } from 'src/lichkham/lichkham.service';

@Injectable()
export class BacsiService {
    constructor(@InjectModel(BacSi.name) private readonly bacsiModel: Model<BacSi>,
        private readonly usersService: UsersService,
        private readonly LichkhamService: LichkhamService) { }


    async getCount(): Promise<number> {
        const count = await this.bacsiModel.countDocuments();
        return count
    }

    async getBacSibyHoten(hoten: string): Promise<BacSi[] | null> {
        try {
            return await this.bacsiModel.find({
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

    async getAllBacSi(fetchPagination: FetchPagination): Promise<BacSi[] | null> {
        let query = this.bacsiModel.find().populate('user').populate('phongs').populate('chuyenkhoa').sort({ hoten: -1 });
        if (fetchPagination.search) {
            query = query.find({
                $text: {
                    $search: `'\"${fetchPagination.search}\"'`,
                    $language: "none",
                    $caseSensitive: false,
                    $diacriticSensitive: false,
                }
            });
        }
        const bacsi = await query.skip(fetchPagination.skip).limit(fetchPagination.take).exec();
        return bacsi
    }

    async getBacSibyUserId(user: string): Promise<BacSi | null> {
        const bacsi = await this.bacsiModel.findOne({ user: user }).populate('user').populate('phongs').populate('chuyenkhoa').exec();
        return bacsi;
    }

    async getBacSibyId(id: string): Promise<BacSi | null> {
        const bacsi = await this.bacsiModel.findOne({ _id: id }).populate('user').populate('phongs').populate('chuyenkhoa').exec();
        return bacsi
    }

    async createBacSi(createBacSiDto: NewBacSiInput, createLichKham: CreateLichkhamInput): Promise<BacSi | null> {
        try {
            if (createBacSiDto.username == "") {
                const createdLichKham = await this.LichkhamService.createLichKham(createLichKham);
                const newBacSi = await this.bacsiModel.create({ ...createBacSiDto, user: null, lichkham: createdLichKham?._id })
                const createdBacSi = await this.bacsiModel
                    .findById(newBacSi._id)
                    .populate('user')
                    .populate('phongs')
                    .populate('chuyenkhoa')
                    .populate('lichkham')
                    .exec();
                return createdBacSi
            }
            else {
                const user = await this.usersService.getUserByUsername(createBacSiDto.username);
                if (user.thongtin) {
                    throw new Error('User đã có thông tin');
                }

                const createdLichKham = await this.LichkhamService.createLichKham(createLichKham);

                const newBacSiData = { ...createBacSiDto, user: user?._id, lichkham: createdLichKham?._id };

                const newBacSi = await this.bacsiModel.create(newBacSiData);

                const createdBacSi = await this.bacsiModel
                    .findById(newBacSi._id)
                    .populate('user')
                    .populate('phongs')
                    .populate('chuyenkhoa')
                    .populate('lichkham')
                    .exec();

                await this.usersService.updateTrangThaiThongTinUser(user?._id.toString());

                return createdBacSi;
            }
        } catch (error) {
            throw new Error('Xử lý tạo bác sĩ bị lỗi: ' + error.message);
        }
    }



    async updateBacSi(updateBacSi: UpdateBacSiInput): Promise<BacSi | null> {
        try {
            if (!updateBacSi.username) {
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
            else {
                const user = await this.usersService.getUserByUsername(updateBacSi.username);
                if (!user) {
                    throw new Error('Không Tìm Thấy Thông Tin Tài Khoản');
                }
                return await this.bacsiModel.findByIdAndUpdate(
                    updateBacSi.id,
                    {
                        $set: {
                            ...updateBacSi, user: user?._id
                        }
                    },
                    { new: true }
                ).exec();
            }
        }catch(error){
            console.log(error)
        }
    }

    async deleteBacSi(_id: string): Promise<void> {
        await this.bacsiModel.deleteOne({ _id });
    }


}
