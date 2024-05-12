import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { TestModule } from 'src/test/test.module';
import { BacsiModule } from 'src/bacsi/bacsi.module';
import { BenhnhanModule } from 'src/benhnhan/benhnhan.module';
import { ThuocModule } from 'src/thuoc/thuoc.module';
import { NhanvienModule } from 'src/nhanvien/nhanvien.module';


@Module({
  controllers: [FileUploadController],
  imports: [TestModule, BacsiModule, BenhnhanModule, ThuocModule, NhanvienModule]
})
export class FileUploadModule {}
