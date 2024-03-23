import { Module } from '@nestjs/common';
import { DatlichService } from './datlich.service';
import { DatlichResolver } from './datlich.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { DatLich, DatLichSchema } from './entities/datlich.entity';

@Module({
  providers: [DatlichService, DatlichResolver],
  imports: [MongooseModule.forFeature([{ name: DatLich.name, schema: DatLichSchema }])],
})
export class DatlichModule { }
