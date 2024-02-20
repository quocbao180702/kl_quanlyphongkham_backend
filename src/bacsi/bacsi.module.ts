import { Module } from '@nestjs/common';
import { BacsiService } from './bacsi.service';
import { BacsiResolver } from './bacsi.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BacSi, BacSiSchema } from './schemas/bacsi.schema';

@Module({
  providers: [BacsiService, BacsiResolver],
  imports: [
    MongooseModule.forFeature([{name: BacSi.name, schema: BacSiSchema}])
  ]
})
export class BacsiModule {}
