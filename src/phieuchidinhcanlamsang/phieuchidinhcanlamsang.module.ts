import { Module } from '@nestjs/common';
import { PhieuchidinhcanlamsangService } from './phieuchidinhcanlamsang.service';
import { PhieuchidinhcanlamsangResolver } from './phieuchidinhcanlamsang.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Phieuchidinhcanlamsang, PhieuchidinhcanlamsangSchema } from './entities/phieuchidinhcanlamsang.entity';

@Module({
  providers: [PhieuchidinhcanlamsangResolver, PhieuchidinhcanlamsangService],
  imports: [MongooseModule.forFeature([{name: Phieuchidinhcanlamsang.name, schema: PhieuchidinhcanlamsangSchema}])]
})
export class PhieuchidinhcanlamsangModule {}
