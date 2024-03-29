import { Module } from '@nestjs/common';
import { HoadonchidinhcanlamsangService } from './hoadonchidinhcanlamsang.service';
import { HoadonchidinhcanlamsangResolver } from './hoadonchidinhcanlamsang.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { HoadonChiDinhCanLamSangSchema, Hoadonchidinhcanlamsang } from './entities/hoadonchidinhcanlamsang.entity';

@Module({
  providers: [HoadonchidinhcanlamsangResolver, HoadonchidinhcanlamsangService],
  imports: [MongooseModule.forFeature([{ name: Hoadonchidinhcanlamsang.name, schema: HoadonChiDinhCanLamSangSchema }])]
})
export class HoadonchidinhcanlamsangModule { }
