import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestResolver } from './test.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestSchema } from './entities/test.entity';

@Module({
  providers: [TestResolver, TestService],
  imports: [MongooseModule.forFeature([{name: Test.name, schema: TestSchema}])],
  exports: [TestService]
})
export class TestModule {}
