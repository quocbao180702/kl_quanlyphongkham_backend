import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HoadonService } from './hoadon.service';
import { Hoadon } from './entities/hoadon.entity';
import { CreateHoadonInput } from './dto/create-hoadon.input';
import { UpdateHoadonInput } from './dto/update-hoadon.input';

@Resolver(() => Hoadon)
export class HoadonResolver {
  constructor(private readonly hoadonService: HoadonService) {}

  @Mutation(() => Hoadon)
  createHoadon(@Args('createHoadonInput') createHoadonInput: CreateHoadonInput) {
    return this.hoadonService.createHoaDon(createHoadonInput);
  }

  @Query(() => [Hoadon])
  findAll() {
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

  @Mutation(() => Hoadon)
  deleteHoadon(@Args('id', { type: () => String }) id: string) {
    return this.hoadonService.deleteHoadon(id);
  }
}
