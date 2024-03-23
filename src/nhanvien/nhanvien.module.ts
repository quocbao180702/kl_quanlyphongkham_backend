import { Module } from '@nestjs/common';
import { NhanvienService } from './nhanvien.service';
import { NhanvienResolver } from './nhanvien.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { NhanVien, NhanVienSchema } from './entities/nhanvien.entity';

@Module({
  providers: [NhanvienService, NhanvienResolver],
  imports: [MongooseModule.forFeature([{name: NhanVien.name, schema: NhanVienSchema}])],
  exports: [NhanvienService]
})
export class NhanvienModule {}
