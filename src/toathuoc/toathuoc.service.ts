import { Injectable } from '@nestjs/common';
import { CreateToathuocInput } from './dto/create-toathuoc.input';
import { UpdateToathuocInput } from './dto/update-toathuoc.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Toathuoc } from './entities/toathuoc.entity';
import { Thuoc } from 'src/thuoc/entities/thuoc.entity';
import { ThuocService } from 'src/thuoc/thuoc.service';
import { FetchPagination } from 'src/types/fetchPagination.input';

@Injectable()
export class ToathuocService {
  constructor(
    @InjectModel(Toathuoc.name) private readonly toathuochModel: Model<Toathuoc>,
    private readonly thuocService: ThuocService
  ) { }

  async getAllToaThuoc(): Promise<Toathuoc[] | null> {
    return await this.toathuochModel.find()
      .populate('benhnhan')
      .populate('bacsi')
      .populate('thuocs')
      .populate('benhs')
      .exec();
  }

  async getAllToaThuocbyBenhNhan(benhnhanId: string): Promise<Toathuoc[] | null> {
    return await this.toathuochModel.find({ benhnhan: benhnhanId })
      .populate('benhnhan').populate('bacsi').populate('thuocs').populate('benhs').exec();
  }


  async getCountToaThuocbyBacSi(bacsiId: string): Promise<number> {
    try {
      const count = await this.toathuochModel.countDocuments({ bacsi: bacsiId });
      return count;
    } catch (error) {
      console.error('Error counting prescriptions by doctor ID:', error);
      return 0;
    }
  }


  async getAllToaThuocbyBacSi(bacsiId: string, fetchPagination: FetchPagination): Promise<Toathuoc[] | null> {
    try {
      const toaThuoc = await this.toathuochModel.find({ bacsi: bacsiId })
        .populate('benhnhan')  
        .populate('bacsi')     
        .populate('thuocs')   
        .populate('benhs')    
        .skip(fetchPagination.skip)  
        .limit(fetchPagination.take) 
        .sort({ ngaytao: -1 })       
        .exec();
      return toaThuoc;
    } catch (error) {
      console.error('Error fetching prescriptions by doctor ID:', error);
      return null;
    }
  }


  async createToathuoc(createToathuoc: CreateToathuocInput): Promise<Toathuoc | null> {
    try {
      const thuocIds = createToathuoc.thuocs;

      const danhSachThuoc = await this.thuocService.getThuocbyIds(thuocIds);

      danhSachThuoc.forEach(async (thuoc, index) => {

        await this.thuocService.updateSoluongThuoc(thuoc._id.toString(), createToathuoc.soluongs[index]);
        /* console.log('id is', thuoc._id.toString());
        console.log('quantity is',createToathuoc.soluongs[index]) */
      });


      const createdToathuoc = await this.toathuochModel.create(createToathuoc);

      // Populate các trường tham chiếu
      const populatedToathuoc = await this.toathuochModel
        .findById(createdToathuoc._id)
        .populate('benhnhan')
        .populate('bacsi')
        .populate('benhs')
        .populate('thuocs')
        .exec();

      return populatedToathuoc;
    } catch (error) {
      // Xử lý lỗi
      console.error("Error creating Toathuoc:", error);
      return null;
    }
  }

  async updateToathuoc(updateToathuoc: UpdateToathuocInput): Promise<Toathuoc | null> {
    return await this.toathuochModel.findByIdAndUpdate(
      updateToathuoc.id,
      {
        $set: {
          ...updateToathuoc
        }
      },
      { new: true }
    ).exec();
  }

  async deleteToathuoc(_id: string): Promise<void> {
    await this.toathuochModel.deleteOne({ _id });
  }
}
