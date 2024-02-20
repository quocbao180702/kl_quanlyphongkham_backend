import { Module } from '@nestjs/common';
import { BenhnhanService } from './benhnhan.service';
import { BenhNhanResolver } from './benhnhan.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BenhNhan, BenhNhanSchema } from './schemas/benhnhan.schema';

@Module({
  providers: [BenhnhanService, BenhNhanResolver],
  imports: [
    MongooseModule.forFeature([{name: BenhNhan.name, schema: BenhNhanSchema }])
  ]

})
export class BenhnhanModule {}
