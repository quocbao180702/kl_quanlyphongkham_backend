import { Module } from '@nestjs/common';
import { HoadonService } from './hoadon.service';
import { HoadonResolver } from './hoadon.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Hoadon, HoadonSchema } from './entities/hoadon.entity';

@Module({
  providers: [HoadonResolver, HoadonService],
  imports: [MongooseModule.forFeature([{name: Hoadon.name, schema: HoadonSchema}])]
})
export class HoadonModule {}
