import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HoadonchidinhcanlamsangService } from './hoadonchidinhcanlamsang.service';
import { Hoadonchidinhcanlamsang } from './entities/hoadonchidinhcanlamsang.entity';
import { CreateHoadonchidinhcanlamsangInput } from './dto/create-hoadonchidinhcanlamsang.input';
import { UpdateHoadonchidinhcanlamsangInput } from './dto/update-hoadonchidinhcanlamsang.input';

@Resolver()
export class HoadonchidinhcanlamsangResolver {
  constructor(private readonly hoadonchidinhcanlamsangService: HoadonchidinhcanlamsangService) { }

  @Mutation(() => Hoadonchidinhcanlamsang)
  async createHoadonchidinhcanlamsang(@Args('createHoadonchidinhcanlamsang') createHoadonchidinhcanlamsang: CreateHoadonchidinhcanlamsangInput): Promise<Hoadonchidinhcanlamsang | null> {
    return this.hoadonchidinhcanlamsangService.createHoadonchidinhcanlamsang(createHoadonchidinhcanlamsang);
  }

  @Query(() => [Hoadonchidinhcanlamsang])
  getAllHoaDonPhieuCanLamSang() {
    return this.hoadonchidinhcanlamsangService.getAllHoaDonPhieuCanLamSang()
  }

}
