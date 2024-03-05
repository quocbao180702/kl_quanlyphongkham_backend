import { Module } from '@nestjs/common';
import { PhongResolver } from './phong.resolver';
import { PhongService } from './phong.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Phong, PhongSchema } from './entities/phong.entity';

@Module({
  providers: [PhongResolver, PhongService],
  imports: [MongooseModule.forFeature([{name: Phong.name, schema: PhongSchema}])]
})
export class PhongModule {}
