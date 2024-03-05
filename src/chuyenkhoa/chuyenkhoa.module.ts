import { Module } from '@nestjs/common';
import { ChuyenkhoaResolver } from './chuyenkhoa.resolver';
import { ChuyenkhoaService } from './chuyenkhoa.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChuyenKhoa, ChuyenKhoaSchema } from './entities/chuyenkhoa.entity';

@Module({
  providers: [ChuyenkhoaResolver, ChuyenkhoaService],
  imports: [MongooseModule.forFeature([{name: ChuyenKhoa.name, schema: ChuyenKhoaSchema}])]
})
export class ChuyenkhoaModule {}
