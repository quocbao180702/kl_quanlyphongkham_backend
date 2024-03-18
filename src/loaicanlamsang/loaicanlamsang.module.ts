import { Module } from '@nestjs/common';
import { LoaicanlamsangService } from './loaicanlamsang.service';
import { LoaicanlamsangResolver } from './loaicanlamsang.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { LoaiCanLamSang, LoaiCanLamSangSchema } from './entities/loaicanlamsang.entity';

@Module({
  providers: [LoaicanlamsangResolver, LoaicanlamsangService],
  imports: [MongooseModule.forFeature([{name: LoaiCanLamSang.name, schema: LoaiCanLamSangSchema}])]
})
export class LoaicanlamsangModule {}
