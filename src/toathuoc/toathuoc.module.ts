import { Module } from '@nestjs/common';
import { ToathuocService } from './toathuoc.service';
import { ToathuocResolver } from './toathuoc.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Toathuoc, ToathuocSchema } from './entities/toathuoc.entity';
import { ThuocModule } from 'src/thuoc/thuoc.module';

@Module({
  providers: [ToathuocResolver, ToathuocService],
  imports: [
    ThuocModule,
    MongooseModule.forFeature([{name: Toathuoc.name, schema: ToathuocSchema}])
  ]
})
export class ToathuocModule {}
