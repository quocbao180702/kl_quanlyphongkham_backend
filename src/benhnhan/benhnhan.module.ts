import { Module } from '@nestjs/common';
import { BenhnhanService } from './benhnhan.service';
import { BenhNhanResolver } from './benhnhan.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BenhNhan, BenhNhanSchema } from './entities/benhnhan.entity';
import { SinhhieuModule } from 'src/sinhhieu/sinhhieu.module';
import { SinhhieuService } from 'src/sinhhieu/sinhhieu.service';
import { Sinhhieu } from 'src/sinhhieu/entities/sinhhieu.entity';

@Module({
  providers: [BenhnhanService, BenhNhanResolver],
  imports: [
    SinhhieuModule,
    MongooseModule.forFeature([{name: BenhNhan.name, schema: BenhNhanSchema }])
  ]

})
export class BenhnhanModule {}
