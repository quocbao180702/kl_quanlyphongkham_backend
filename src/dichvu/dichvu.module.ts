import { Module } from '@nestjs/common';
import { DichvuService } from './dichvu.service';
import { DichvuResolver } from './dichvu.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Dichvu, DichvuSchema } from './entities/dichvu.entity';

@Module({
  providers: [DichvuResolver, DichvuService],
  imports: [MongooseModule.forFeature([{name: Dichvu.name, schema: DichvuSchema}])]
})
export class DichvuModule {}
