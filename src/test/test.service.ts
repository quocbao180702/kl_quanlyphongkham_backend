import { Injectable } from '@nestjs/common';
import { CreateTestInput } from './dto/create-test.input';
import { UpdateTestInput } from './dto/update-test.input';
import { InjectModel } from '@nestjs/mongoose';
import { Test } from './entities/test.entity';
import { Model } from 'mongoose';

@Injectable()
export class TestService {
  constructor(@InjectModel(Test.name) private readonly testModel: Model<Test>){}

  async create(createTestInput: CreateTestInput) {
    return await this.testModel.create(createTestInput)
  }

  async getbyId(id: string){
    return await this.testModel.findOne({_id: id});
  }

 /*  findAll() {
    return `This action returns all test`;
  }

  findOne(id: number) {
    return `This action returns a #${id} test`;
  }

  update(id: number, updateTestInput: UpdateTestInput) {
    return `This action updates a #${id} test`;
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  } */
}
