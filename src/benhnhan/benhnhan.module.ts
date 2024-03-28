import { Module } from '@nestjs/common';
import { BenhnhanService } from './benhnhan.service';
import { BenhNhanResolver } from './benhnhan.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BenhNhan, BenhNhanSchema } from './entities/benhnhan.entity';
import { SinhhieuModule } from 'src/sinhhieu/sinhhieu.module';
import { SinhhieuService } from 'src/sinhhieu/sinhhieu.service';
import { Sinhhieu } from 'src/sinhhieu/entities/sinhhieu.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [BenhnhanService, BenhNhanResolver],
  imports: [
    UsersModule,
    SinhhieuModule,
    MongooseModule.forFeature([{name: BenhNhan.name, schema: BenhNhanSchema }])
  ],
  exports: [BenhnhanService]

})
export class BenhnhanModule {}
