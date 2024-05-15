import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { HoadonService } from './hoadon.service';
import { Hoadon } from './entities/hoadon.entity';
import { CreateHoadonInput } from './dto/create-hoadon.input';
import { UpdateHoadonInput } from './dto/update-hoadon.input';
import { MongthRange } from './dto/monthRange';
import { FetchPagination } from 'src/types/fetchPagination.input';
import { PubSub } from 'graphql-subscriptions';


const pubSub = new PubSub();

@Resolver(() => Hoadon)
export class HoadonResolver {
  constructor(private readonly hoadonService: HoadonService) { }

  @Mutation(() => Hoadon)
  async createHoadon(@Args('createHoadonInput') createHoadonInput: CreateHoadonInput) {
    const newHoaDon = await this.hoadonService.createHoaDon(createHoadonInput);
    pubSub.publish('newHoaDon', {newHoaDon: newHoaDon});
    return newHoaDon
  }

  @Subscription(returns => Hoadon, {
    name: 'newHoaDon'
  })
  newHoaDon(){
    return pubSub.asyncIterator('newHoaDon')
  }

  @Query(() => Number)
  async getTotalThanhTienByDate(@Args('start') start: Date, @Args('end') end: Date): Promise<Number | null> {
    return this.hoadonService.getTotalThanhTienByDate(start, end)
  }

  @Query(() => [Hoadon])
  async getAllHoadonByBenhNhan(@Args('benhnhanId') benhnhanId: string): Promise<Hoadon[] | null> {
    return await this.hoadonService.getAllHoadonByBenhNhan(benhnhanId);
  }

  @Mutation(() => Hoadon)
  async updateTrangThaiHoaDon(@Args('id') id: string): Promise<Hoadon> {
    return this.hoadonService.updateTrangThaiHoaDon(id);
  }

  @Query(() => Number, {name: 'CountHoadon'})
  async getCount(): Promise<number>{
    return this.hoadonService.getCount();
  }

  @Query(() => [Hoadon])
  async getAllHoadon(@Args('fetchPagination') fetchPagination: FetchPagination): Promise<Hoadon[] | null> {
    return this.hoadonService.getAllHoadon(fetchPagination);
  }

  @Query(() => [Hoadon])
  async getHoaDonbyNgay(@Args('ngaykham') ngaykham: string): Promise<Hoadon[] | null>{
    return this.hoadonService.getHoaDonbyNgay(ngaykham);
  }

  @Query(() => [MongthRange])
  async getTongTienbyMonth(@Args('year') year: number): Promise<MongthRange[]>{
    return await this.hoadonService.getTongTienbyMonth(year);
  }


  @Mutation(() => Hoadon)
  updateHoadon(@Args('updateHoadonInput') updateHoadonInput: UpdateHoadonInput) {
    return this.hoadonService.updateHoaDon(updateHoadonInput);
  }

  @Mutation(() => Boolean)
  deleteHoadon(@Args('id', { type: () => String }) id: string): Promise<boolean> {
    return this.hoadonService.deleteHoadon(id);
  }
}
