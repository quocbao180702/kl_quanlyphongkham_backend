import { Module } from '@nestjs/common';
import { SinhhieuService } from './sinhhieu.service';
import { SinhhieuResolver } from './sinhhieu.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Sinhhieu, SinhhieuSchema } from './entities/sinhhieu.entity';

@Module({
  providers: [SinhhieuResolver, SinhhieuService],
  imports: [MongooseModule.forFeature([{name: Sinhhieu.name, schema: SinhhieuSchema}])],
  exports: [SinhhieuService]
})
export class SinhhieuModule {}
