import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhieuXacNhan, PhieuXacNhanSchema } from './schemas/PhieuXacNhan.schema';
import { PhieuXacNhanResolver } from './phieuxacnhan.resolver';
import { PhieuXacNhanService } from './PhieuXacNhan.service';

@Module({
  providers: [PhieuXacNhanResolver, PhieuXacNhanService],
  imports: [MongooseModule.forFeature([{name: PhieuXacNhan.name, schema: PhieuXacNhanSchema}])]
})
export class PhieuxacnhanModule {}
