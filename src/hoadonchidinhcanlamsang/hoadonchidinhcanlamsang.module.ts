import { Module } from '@nestjs/common';
import { HoadonchidinhcanlamsangService } from './hoadonchidinhcanlamsang.service';
import { HoadonchidinhcanlamsangResolver } from './hoadonchidinhcanlamsang.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { HoadonChiDinhCanLamSangSchema, Hoadonchidinhcanlamsang } from './entities/hoadonchidinhcanlamsang.entity';
import { BenhnhanModule } from 'src/benhnhan/benhnhan.module';

@Module({
  providers: [HoadonchidinhcanlamsangResolver, HoadonchidinhcanlamsangService],
  imports: [BenhnhanModule, MongooseModule.forFeature([{ name: Hoadonchidinhcanlamsang.name, schema: HoadonChiDinhCanLamSangSchema }])]
})
export class HoadonchidinhcanlamsangModule { }
