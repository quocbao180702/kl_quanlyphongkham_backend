import { Module } from '@nestjs/common';
import { SobenhService } from './sobenh.service';
import { SobenhResolver } from './sobenh.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Sobenh, SobenhSchema } from './entities/sobenh.entity';

@Module({
  providers: [SobenhResolver, SobenhService],
  imports: [MongooseModule.forFeature([{name: Sobenh.name, schema: SobenhSchema}])]
})
export class SobenhModule {}
