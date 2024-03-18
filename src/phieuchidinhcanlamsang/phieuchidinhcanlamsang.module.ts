import { Module } from '@nestjs/common';
import { PhieuchidinhcanlamsangService } from './phieuchidinhcanlamsang.service';
import { PhieuchidinhcanlamsangResolver } from './phieuchidinhcanlamsang.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Phieuchidinhcanlamsang, PhieuchidinhcanlamsangSchema } from './entities/phieuchidinhcanlamsang.entity';
import { KetquacanlamsangService } from 'src/ketquacanlamsang/ketquacanlamsang.service';
import { KetquacanlamsangModule } from 'src/ketquacanlamsang/ketquacanlamsang.module';

@Module({
  providers: [PhieuchidinhcanlamsangResolver, PhieuchidinhcanlamsangService],
  imports: [KetquacanlamsangModule, MongooseModule.forFeature([{name: Phieuchidinhcanlamsang.name, schema: PhieuchidinhcanlamsangSchema}])]
})
export class PhieuchidinhcanlamsangModule {}
