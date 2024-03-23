import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PhieuXacNhanService } from './PhieuXacNhan.service';
import { PhieuXacNhan } from './entities/phieuxacnhan.entity';
import { CreatePhieuXacNhanInput } from './dto/create-PhieuXacNhan.input';
import { UpdatePhieuXacNhanInput } from './dto/update-PhieuXacNhan.input';
import { Schema as MongooseSchema } from "mongoose";

@Resolver(() => PhieuXacNhan)
export class PhieuXacNhanResolver {
  constructor(private readonly phieuxacnhanService: PhieuXacNhanService) { }

  @Query(() => [PhieuXacNhan])
  async getAllPhieuXacNhan(): Promise<PhieuXacNhan[]> {
    return await this.phieuxacnhanService.getAllPhieuXacNhan();
  }

  @Query(() => [PhieuXacNhan])
  async getAllByNgayVaPhong(
    @Args('ngaykham') ngaykham: string,
    @Args('phongIds') phongIds: string,
  ): Promise<PhieuXacNhan[]> {
    return await this.phieuxacnhanService.getAllByNgayVaPhong(ngaykham, phongIds);
  }

  @Mutation(() => PhieuXacNhan)
  async createPhieuXacNhan(@Args('newPhieuXacNhanInput') newPhieuXacNhanInput: CreatePhieuXacNhanInput): Promise<PhieuXacNhan | null> {
    const newPhieuXacNhan = await this.phieuxacnhanService.createPhieuXacNhan(newPhieuXacNhanInput);
    return newPhieuXacNhan;
  }

  @Mutation(() => PhieuXacNhan)
  async updatePhieuXacNhan(@Args('input') input: UpdatePhieuXacNhanInput): Promise<PhieuXacNhan | null> {
    const update = await this.phieuxacnhanService.updatePhieuXacNhan(input);
    if (!update) {
      throw new Error(`User with ID ${input.id} not found.`);
    }
    return update;
  }

  @Mutation(() => Boolean)
  async deletePhieuXacNhan(@Args('_id') _id: string): Promise<boolean> {
    await this.phieuxacnhanService.deletePhieuXacNhan(_id);
    return true;
  }
}
