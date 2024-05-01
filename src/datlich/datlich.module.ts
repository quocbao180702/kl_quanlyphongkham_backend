import { Module } from '@nestjs/common';
import { DatlichService } from './datlich.service';
import { DatlichResolver } from './datlich.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BenhnhanModule } from 'src/benhnhan/benhnhan.module';
import { DatLich, DatLichSchema } from './entities/datlich.entity';
import { DatLichBacSi, DatLichBacSiSchema } from './entities/datlicbacsi.entity';
import { DatLichBacSiService } from './datlichbacsi.service';
import { DatlichBacSiResolver } from './datlichbacsi.resolver';

@Module({
  providers: [DatlichService, DatlichResolver, DatLichBacSiService, DatlichBacSiResolver],
  imports: [BenhnhanModule,
    MongooseModule.forFeature([
      { name: DatLich.name, schema: DatLichSchema },
      { name: DatLichBacSi.name, schema: DatLichBacSiSchema }
    ]),
  ],
})
export class DatlichModule { }
