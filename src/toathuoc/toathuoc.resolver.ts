import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ToathuocService } from './toathuoc.service';
import { Toathuoc } from './entities/toathuoc.entity';
import { CreateToathuocInput } from './dto/create-toathuoc.input';
import { UpdateToathuocInput } from './dto/update-toathuoc.input';
import { FetchPagination } from 'src/types/fetchPagination.input';

@Resolver(() => Toathuoc)
export class ToathuocResolver {
  constructor(private readonly toathuocService: ToathuocService) { }

  @Mutation(() => Toathuoc)
  createToathuoc(@Args('createToathuocInput') createToathuocInput: CreateToathuocInput) {
    return this.toathuocService.createToathuoc(createToathuocInput);
  }

  @Query(() => [Toathuoc])
  getAllToaThuoc() {
    return this.toathuocService.getAllToaThuoc();
  }

  @Query(() => [Toathuoc])
  async getAllToaThuocbyBenhNhan(@Args('benhnhanId') benhnhanId: string): Promise<Toathuoc[] | null> {
    return await this.toathuocService.getAllToaThuocbyBenhNhan(benhnhanId);
  }

  @Query(() => Number, {name: "CountToaThuocbyBacSi"})
  async getToaThuocBacSi(@Args('bacsiId') bacsiId: string ): Promise<number>{
    return this.toathuocService.getCountToaThuocbyBacSi(bacsiId);
  }

  @Query(() => [Toathuoc])
  async getAllToaThuocbyBacSi(@Args('bacsiId') bacsiId: string, @Args('fetchPagination') fetchPagination: FetchPagination): Promise<Toathuoc[] | null> {
    return await this.toathuocService.getAllToaThuocbyBacSi(bacsiId, fetchPagination);
  }

  /* @Query(() => Toathuoc, { name: 'toathuoc' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.toathuocService.findOne(id);
  } */

  @Mutation(() => Toathuoc)
  updateToathuoc(@Args('updateToathuocInput') updateToathuocInput: UpdateToathuocInput) {
    return this.toathuocService.updateToathuoc(updateToathuocInput);
  }

  @Mutation(() => Toathuoc)
  deleteToathuoc(@Args('id') id: string) {
    return this.toathuocService.deleteToathuoc(id);
  }
}
