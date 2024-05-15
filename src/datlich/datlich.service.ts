import { Injectable } from '@nestjs/common';
import { DatLich } from './entities/datlich.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateDatLichInput } from './dto/update-datlich.input';
import { NewDatLichInput } from './dto/new-datlich.input';
import { TrangThaiDatKham } from 'src/types/trangthai-datkham-types';
import { BenhnhanService } from 'src/benhnhan/benhnhan.service';
import { DatLichBacSi } from './entities/datlicbacsi.entity';

@Injectable()
export class DatlichService {

    constructor(@InjectModel(DatLich.name) private readonly datLichModel: Model<DatLich>,
        private readonly benhNhanService: BenhnhanService) { }


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

    async getAllDatLichbyTrangThai(trangthai: string): Promise<DatLich[] | null> {
        try {
            return await this.datLichModel
                .find({ trangthai: trangthai })
                .sort({ ngaydat: 1 })
                .populate({
                    path: 'benhnhan',
                    populate: {
                        path: 'user'
                    }
                })
                .exec();
        } catch (error) {
            console.error('Error while fetching DatLich:', error);
            return null;
        }
    }

    async createDatLich(createDatLich: NewDatLichInput): Promise<DatLich | null> {
        try {
            const getBenhNhan = await this.benhNhanService.getBenhNhanbySoDienThoai(createDatLich.sodienthoai);

            if (getBenhNhan?._id) {
                const createdDatLich = (await this.datLichModel.create({ ...createDatLich, benhnhan: getBenhNhan?._id })).populate({
                    path: 'benhnhan',
                    populate: {
                        path: 'user'
                    }
                });
                return createdDatLich;
            }
            else {
                const data = {
                    hoten: createDatLich?.hoten,
                    cccd: createDatLich?.cccd,
                    sodienthoai: createDatLich?.sodienthoai,
                    gioitinh: createDatLich?.gioitinh,
                    ngaysinh: createDatLich?.ngaysinh,
                    diachi: "",
                    bhyt: "",
                    username: ""
                }
                const createBenhNhan = await this.benhNhanService.createBenhNhan(data);
                if(createBenhNhan?._id){
                    const createdDatLich = (await this.datLichModel.create({ ...createDatLich, benhnhan: createBenhNhan?._id })).populate({
                        path: 'benhnhan',
                        populate: {
                            path: 'user'
                        }
                    });
                    return createdDatLich;
                }
                else{
                    return null;
                }
            }
        } catch (error) {
            throw new Error("Error new now")
        }
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

    async updateTrangThaiDatLich(id: string, trangthai: string): Promise<DatLich | null> {
        try {
            const updatedDatLich = await this.datLichModel.findByIdAndUpdate(id, { trangthai }, { new: true });
            return updatedDatLich;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteDatLich(_id: string): Promise<void> {
        await this.datLichModel.deleteOne({ _id });
    }

}
