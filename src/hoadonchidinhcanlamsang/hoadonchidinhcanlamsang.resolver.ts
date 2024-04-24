import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HoadonchidinhcanlamsangService } from './hoadonchidinhcanlamsang.service';
import { Hoadonchidinhcanlamsang } from './entities/hoadonchidinhcanlamsang.entity';
import { CreateHoadonchidinhcanlamsangInput } from './dto/create-hoadonchidinhcanlamsang.input';
import { UpdateHoadonchidinhcanlamsangInput } from './dto/update-hoadonchidinhcanlamsang.input';
import { MonthRangeCLS } from './dto/MonthRang';

@Resolver()
export class HoadonchidinhcanlamsangResolver {
  constructor(private readonly hoadonchidinhcanlamsangService: HoadonchidinhcanlamsangService) { }

  @Mutation(() => Hoadonchidinhcanlamsang)
  async createHoadonchidinhcanlamsang(@Args('createHoadonchidinhcanlamsang') createHoadonchidinhcanlamsang: CreateHoadonchidinhcanlamsangInput): Promise<Hoadonchidinhcanlamsang | null> {
    return this.hoadonchidinhcanlamsangService.createHoadonchidinhcanlamsang(createHoadonchidinhcanlamsang);
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
  getAllHoaDonPhieuCanLamSang() {
    return this.hoadonchidinhcanlamsangService.getAllHoaDonPhieuCanLamSang()
  }

  @Query(() => Number)
  async getTotalThanhTienCLSByDate(@Args('start') start: Date, @Args('end') end: Date): Promise<Number | null> {
    return this.hoadonchidinhcanlamsangService.getTotalThanhTienByDate(start, end)
  }

}
