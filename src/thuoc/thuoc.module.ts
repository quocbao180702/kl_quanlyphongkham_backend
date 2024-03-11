import { Module } from '@nestjs/common';
import { ThuocResolver } from './thuoc.resolver';
import { ThuocService } from './thuoc.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Thuoc, ThuocSchema } from './entities/thuoc.entity';

@Module({
  providers: [ThuocResolver, ThuocService],
  imports: [MongooseModule.forFeature([{name:Thuoc.name, schema: ThuocSchema}])],
  exports: [ThuocService]
})
export class ThuocModule {}
