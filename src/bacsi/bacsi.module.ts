import { Module } from '@nestjs/common';
import { BacsiService } from './bacsi.service';
import { BacsiResolver } from './bacsi.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BacSi, BacSiSchema } from './entities/bacsi.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [BacsiService, BacsiResolver],
  imports: [
    UsersModule,
    MongooseModule.forFeature([{name: BacSi.name, schema: BacSiSchema}])
  ]
})
export class BacsiModule {}
