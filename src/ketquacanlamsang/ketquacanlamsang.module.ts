import { Module } from '@nestjs/common';
import { KetquacanlamsangService } from './ketquacanlamsang.service';
import { KetquacanlamsangResolver } from './ketquacanlamsang.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { KetQuaCanLamSang, KetQuaCanLamSangSchema } from './entities/ketquacanlamsang.entity';

@Module({
  providers: [KetquacanlamsangResolver, KetquacanlamsangService],
  imports: [MongooseModule.forFeature([{name: KetQuaCanLamSang.name, schema: KetQuaCanLamSangSchema}])],
  exports: [KetquacanlamsangService]
})
export class KetquacanlamsangModule {}
