import { Module } from '@nestjs/common';
import { ThuocResolver } from './thuoc.resolver';
import { ThuocService } from './thuoc.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Thuoc, ThuocSchema } from './schemas/thuoc.schema';

@Module({
  providers: [ThuocResolver, ThuocService],
  imports: [MongooseModule.forFeature([{name:Thuoc.name, schema: ThuocSchema}])]
})
export class ThuocModule {}
