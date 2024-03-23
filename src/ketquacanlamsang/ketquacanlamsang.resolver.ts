import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { KetquacanlamsangService } from './ketquacanlamsang.service';
import { KetQuaCanLamSang } from './entities/ketquacanlamsang.entity';
import { CreateKetquacanlamsangInput } from './dto/create-ketquacanlamsang.input';
import { UpdateKetquacanlamsangInput } from './dto/update-ketquacanlamsang.input';

@Resolver(() => KetQuaCanLamSang)
export class KetquacanlamsangResolver {
  constructor(private readonly ketquacanlamsangService: KetquacanlamsangService) { }

  @Mutation(() => KetQuaCanLamSang)
  async createKetquacanlamsang(@Args('createKetquacanlamsangInput') createKetquacanlamsangInput: CreateKetquacanlamsangInput) {
    return await this.ketquacanlamsangService.createKetQuaCLS(createKetquacanlamsangInput);
  }

  @Mutation(() => KetQuaCanLamSang)
  async updateKetquacanlamsang(@Args('updateKetquacanlamsangInput') updateKetquacanlamsangInput: UpdateKetquacanlamsangInput) {
    return await this.ketquacanlamsangService.updateKetQuaCLS(updateKetquacanlamsangInput);
  }

  @Query(() => [KetQuaCanLamSang], { nullable: true })
  async findAllRelatedKetQuaCanLamSang(
    @Args('ketQuaIds', { type: () => [String] }) ketQuaIds: string[],
  ): Promise<KetQuaCanLamSang[] | null> {
    return await this.ketquacanlamsangService.findAllRelatedKetQuaCanLamSang(ketQuaIds);
  }


  /* @Query(() => [KetQuaCanLamSang], { name: 'ketquacanlamsang' })
  findAll() {
    return this.ketquacanlamsangService.findAll();
  }

  @Query(() => KetQuaCanLamSang, { name: 'ketquacanlamsang' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ketquacanlamsangService.findOne(id);
  }

  @Mutation(() => KetQuaCanLamSang)
  updateKetquacanlamsang(@Args('updateKetquacanlamsangInput') updateKetquacanlamsangInput: UpdateKetquacanlamsangInput) {
    return this.ketquacanlamsangService.update(updateKetquacanlamsangInput.id, updateKetquacanlamsangInput);
  }

  @Mutation(() => KetQuaCanLamSang)
  removeKetquacanlamsang(@Args('id', { type: () => Int }) id: number) {
    return this.ketquacanlamsangService.remove(id);
  } */
}
