import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HoadonService } from './hoadon.service';
import { Hoadon } from './entities/hoadon.entity';
import { CreateHoadonInput } from './dto/create-hoadon.input';
import { UpdateHoadonInput } from './dto/update-hoadon.input';

@Resolver(() => Hoadon)
export class HoadonResolver {
  constructor(private readonly hoadonService: HoadonService) { }

  @Mutation(() => Hoadon)
  createHoadon(@Args('createHoadonInput') createHoadonInput: CreateHoadonInput) {
    return this.hoadonService.createHoaDon(createHoadonInput);
  }

  @Query(() => [Hoadon])
  async getAllHoadonByBenhNhan(@Args('benhnhanId') benhnhanId: string): Promise<Hoadon[] | null>{
    return await this.hoadonService.getAllHoadonByBenhNhan(benhnhanId);
  }

  @Mutation(() => Hoadon)
  async updateTrangThaiHoaDon(@Args('id') id: string): Promise<Hoadon> {
    return this.hoadonService.updateTrangThaiHoaDon(id);
  }

  @Query(() => [Hoadon])
  getAllHoadon() {
    return this.hoadonService.getAllHoadon();
  }

  /* @Query(() => Hoadon, { name: 'hoadon' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.hoadonService.findOne(id);
  } */

  @Mutation(() => Hoadon)
  updateHoadon(@Args('updateHoadonInput') updateHoadonInput: UpdateHoadonInput) {
    return this.hoadonService.updateHoaDon(updateHoadonInput);
  }

  @Mutation(() => Boolean)
  deleteHoadon(@Args('id', { type: () => String }) id: string): Promise<boolean> {
    return this.hoadonService.deleteHoadon(id);
  }
}
