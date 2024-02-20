import { Module } from '@nestjs/common';
import { BenhService } from './benh.service';
import { BenhResolver } from './benh.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Benh, BenhSchema } from './schemas/benh.schema';

@Module({
  providers: [BenhService, BenhResolver],
  imports: [MongooseModule.forFeature([{name: Benh.name, schema: BenhSchema}])]
})
export class BenhModule {}
