import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Subscription } from '@nestjs/graphql';
/* import { PhieuXacNhanService } from './PhieuXacNhan.service'; */
import { PhieuXacNhanService } from './phieuxacnhan.service';
import { PhieuXacNhan } from './entities/phieuxacnhan.entity';
/* import { CreatePhieuXacNhanInput } from './dto/create-PhieuXacNhan.input'; */
import { CreatePhieuXacNhanInput } from './dto/create-phieuxacnhan.input';
/* import { UpdatePhieuXacNhanInput } from './dto/update-PhieuXacNhan.input'; */
import { UpdatePhieuXacNhanInput } from './dto/update-phieuxacnhan.input';
import { Schema as MongooseSchema } from "mongoose";
import { Phieuchidinhcanlamsang } from 'src/phieuchidinhcanlamsang/entities/phieuchidinhcanlamsang.entity';
import { PhieuchidinhcanlamsangService } from 'src/phieuchidinhcanlamsang/phieuchidinhcanlamsang.service';
import { Inject, forwardRef } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { start } from 'repl';
import { MonthRange } from './dto/monthRange';

const pubSub = new PubSub()

@Resolver(() => PhieuXacNhan)
export class PhieuXacNhanResolver {
  constructor(private readonly phieuxacnhanService: PhieuXacNhanService,
    @Inject(forwardRef(() => PhieuchidinhcanlamsangService))
    private phieuchidinhcanlamsangService: PhieuchidinhcanlamsangService) { }

  @Query(() => [PhieuXacNhan])
  async getAllPhieuXacNhan(): Promise<PhieuXacNhan[]> {
    return await this.phieuxacnhanService.getAllPhieuXacNhan();
  }


  @Query(() => Number)
  async countPhieuXacNhanByDate(@Args('start') start: Date, @Args('end') end: Date): Promise<Number | null> {
    return this.phieuxacnhanService.countPhieuXacNhanByDate(start, end)
  }

  @Query(() => [MonthRange])
  async getStartAndEndOfMonth(@Args('year') year: number): Promise<MonthRange[]> {
    return await this.phieuxacnhanService.getStartAndEndOfMonth(year);
  }

  @Query(() => [PhieuXacNhan], { nullable: true })
  async getAllPhieuXacNhanDaXetNgiem(
    @Args('ngaykham') ngaykham: string,
    @Args('phongIds') phongIds: string
  ): Promise<PhieuXacNhan[] | null> {
    try {
      const phieuXacNhanDaXetNgiem = await this.phieuxacnhanService.getAllPhieuXacNhanDaXetNgiem(ngaykham, phongIds);
      return phieuXacNhanDaXetNgiem;
    } catch (error) {
      console.error("Lỗi khi lấy tất cả các phiếu xác nhận đã xét nghiệm:", error);
      return;
    }
  }

  @ResolveField(() => Phieuchidinhcanlamsang, { name: 'phieuchidinhcanlamsang', nullable: true })
  async getPhieuCanLamSangbyPhieuXacNhanId(@Parent() Phieuchidinhcanlamsang) {
    const { id } = Phieuchidinhcanlamsang;
    return this.phieuchidinhcanlamsangService.getPhieuCanLamSangbyPhieuXacNhanId(id);
  }

  @Query(() => [PhieuXacNhan])
  async getAllByNgayVaPhong(
    @Args('ngaykham') ngaykham: string,
    @Args('phongIds') phongIds: string,
    @Args('trangthai') trangthai: string
  ): Promise<PhieuXacNhan[]> {
    return await this.phieuxacnhanService.getAllByNgayVaPhong(ngaykham, phongIds, trangthai);
  }

  @Mutation(() => PhieuXacNhan)
  async createPhieuXacNhan(@Args('newPhieuXacNhanInput') newPhieuXacNhanInput: CreatePhieuXacNhanInput): Promise<PhieuXacNhan | null> {
    const newPhieuXacNhan = await this.phieuxacnhanService.createPhieuXacNhan(newPhieuXacNhanInput);
    pubSub.publish('newPhieuXacNhan', { newPhieuXacNhan: newPhieuXacNhan });
    return newPhieuXacNhan;
  }

  @Subscription(returns => PhieuXacNhan, {
    name: 'newPhieuXacNhan'
  })
  newPhieuXacNhan() {
    return pubSub.asyncIterator('newPhieuXacNhan')
  }

  @Mutation(() => PhieuXacNhan)
  async updatePhieuXacNhan(@Args('input') input: UpdatePhieuXacNhanInput): Promise<PhieuXacNhan | null> {
    const update = await this.phieuxacnhanService.updatePhieuXacNhan(input);
    if (!update) {
      throw new Error(`User with ID ${input.id} not found.`);
    }
    return update;
  }

  @Mutation(() => PhieuXacNhan)
  async updateTrangThaiKham(@Args('id') id: string, @Args('trangthai') trangthai: string): Promise<PhieuXacNhan | null> {
    const update = await this.phieuxacnhanService.updateTrangThaiKham(id, trangthai);
    if (!update) {
      throw new Error(`User with ID ${id} not found.`);
    }
    return update;
  }

  @Mutation(() => Boolean)
  async deletePhieuXacNhan(@Args('_id') _id: string): Promise<boolean> {
    await this.phieuxacnhanService.deletePhieuXacNhan(_id);
    return true;
  }
}
