import { Module } from '@nestjs/common';
import { LichkhamService } from './lichkham.service';
import { LichkhamResolver } from './lichkham.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Lichkham, LichkhamSchema } from './entities/lichkham.entity';

@Module({
  providers: [LichkhamResolver, LichkhamService],
  imports: [MongooseModule.forFeature([{ name: Lichkham.name, schema: LichkhamSchema }])],
  exports: [LichkhamService]
})
export class LichkhamModule { }
