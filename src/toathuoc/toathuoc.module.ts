import { Module } from '@nestjs/common';
import { ToathuocService } from './toathuoc.service';
import { ToathuocResolver } from './toathuoc.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Toathuoc, ToathuocSchema } from './entities/toathuoc.entity';

@Module({
  providers: [ToathuocResolver, ToathuocService],
  imports: [MongooseModule.forFeature([{name: Toathuoc.name, schema: ToathuocSchema}])]
})
export class ToathuocModule {}
