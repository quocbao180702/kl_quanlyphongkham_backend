import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhieuXacNhan, PhieuXacNhanSchema } from './entities/phieuxacnhan.entity';
import { PhieuXacNhanResolver } from './phieuxacnhan.resolver';
import { PhieuXacNhanService } from './phieuxacnhan.service';
import { PhieuchidinhcanlamsangModule } from 'src/phieuchidinhcanlamsang/phieuchidinhcanlamsang.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  providers: [PhieuXacNhanResolver, PhieuXacNhanService],
  imports: [forwardRef(() => PhieuchidinhcanlamsangModule), MongooseModule.forFeature([{ name: PhieuXacNhan.name, schema: PhieuXacNhanSchema }]), MailModule],
  exports: [PhieuXacNhanService]
})
export class PhieuxacnhanModule { }
