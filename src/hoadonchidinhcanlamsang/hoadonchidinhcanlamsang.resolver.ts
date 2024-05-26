import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { HoadonchidinhcanlamsangService } from './hoadonchidinhcanlamsang.service';
import { Hoadonchidinhcanlamsang } from './entities/hoadonchidinhcanlamsang.entity';
import { CreateHoadonchidinhcanlamsangInput } from './dto/create-hoadonchidinhcanlamsang.input';
import { UpdateHoadonchidinhcanlamsangInput } from './dto/update-hoadonchidinhcanlamsang.input';
import { MonthRangeCLS } from './dto/MonthRang';
import { FetchPagination } from 'src/types/fetchPagination.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub()

@Resolver()
export class HoadonchidinhcanlamsangResolver {
  constructor(private readonly hoadonchidinhcanlamsangService: HoadonchidinhcanlamsangService) { }

  @Mutation(() => Hoadonchidinhcanlamsang)
  async createHoadonchidinhcanlamsang(@Args('createHoadonchidinhcanlamsang') createHoadonchidinhcanlamsang: CreateHoadonchidinhcanlamsangInput): Promise<Hoadonchidinhcanlamsang | null> {
    const createHoaDonCLS = await this.hoadonchidinhcanlamsangService.createHoadonchidinhcanlamsang(createHoadonchidinhcanlamsang);
    pubSub.publish('newHoaDonCLS', {newHoaDonCLS: createHoaDonCLS});
    return createHoaDonCLS;
  }

  @Subscription(returns => Hoadonchidinhcanlamsang, {
    name: 'newHoaDonCLS'
  })
  newHoaDonCLS(){
    return pubSub.asyncIterator('newHoaDonCLS');
  }

  

  @Mutation(() => Hoadonchidinhcanlamsang)
  async updateTinhTrangHoaDonCLS(@Args('id') id: string): Promise<Hoadonchidinhcanlamsang> {
    return this.hoadonchidinhcanlamsangService.updateTinhTrangHoaDonCLS(id);
  }

  @Query(() => [MonthRangeCLS])
  async getTongTienbyMonthCLS(@Args('year') year: number): Promise<MonthRangeCLS[] | null>{
    return this.hoadonchidinhcanlamsangService.getTongTienbyMonthCLS(year);
  }


  @Query(() => [Hoadonchidinhcanlamsang])
  async getHoaDonCLSbyBenhNhan(@Args('idbenhnhan') idbenhnhan: string): Promise<Hoadonchidinhcanlamsang[]|null>{
    return await this.hoadonchidinhcanlamsangService.getHoaDonCLSbyIdBenhNhan(idbenhnhan);
  }

  @Query(() => Number, {name: 'CountHoadonchidinhcanlamsang'})
  async getCount(): Promise<number>{
    return this.hoadonchidinhcanlamsangService.getCount();
  }

  @Query(() => [Hoadonchidinhcanlamsang])
  getAllHoaDonPhieuCanLamSang(@Args('fetchPagination') fetchPagination: FetchPagination): Promise<Hoadonchidinhcanlamsang[] | null> {
    return this.hoadonchidinhcanlamsangService.getAllHoaDonPhieuCanLamSang(fetchPagination)
  }

  @Query(() => Number)
  async getTotalThanhTienCLSByDate(@Args('start') start: Date, @Args('end') end: Date): Promise<Number | null> {
    return this.hoadonchidinhcanlamsangService.getTotalThanhTienByDate(start, end)
  }

}
