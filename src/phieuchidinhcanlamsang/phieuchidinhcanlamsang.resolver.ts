import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PhieuchidinhcanlamsangService } from './phieuchidinhcanlamsang.service';
import { Phieuchidinhcanlamsang } from './entities/phieuchidinhcanlamsang.entity';
import { CreatePhieuchidinhcanlamsangInput } from './dto/create-phieuchidinhcanlamsang.input';
import { UpdatePhieuchidinhcanlamsangInput } from './dto/update-phieuchidinhcanlamsang.input';

@Resolver(() => Phieuchidinhcanlamsang)
export class PhieuchidinhcanlamsangResolver {
  constructor(private readonly phieuchidinhcanlamsangService: PhieuchidinhcanlamsangService) {}

  @Mutation(() => Phieuchidinhcanlamsang)
  createPhieuchidinhcanlamsang(@Args('createPhieuchidinhcanlamsangInput') createPhieuchidinhcanlamsangInput: CreatePhieuchidinhcanlamsangInput) {
    return this.phieuchidinhcanlamsangService.createPhieuCLS(createPhieuchidinhcanlamsangInput);
  }

  @Query(() => [Phieuchidinhcanlamsang])
  getAllPhieuCLS() {
    return this.phieuchidinhcanlamsangService.getAllPhieuCLS();
  }

  /* @Query(() => Phieuchidinhcanlamsang, { name: 'phieuchidinhcanlamsang' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.phieuchidinhcanlamsangService.findOne(id);
  } */

  @Mutation(() => Phieuchidinhcanlamsang)
  updatePhieuchidinhcanlamsang(@Args('updatePhieuchidinhcanlamsangInput') updatePhieuchidinhcanlamsangInput: UpdatePhieuchidinhcanlamsangInput) {
    return this.phieuchidinhcanlamsangService.updatePhieuCLS(updatePhieuchidinhcanlamsangInput);
  }

  @Mutation(() => Phieuchidinhcanlamsang)
  deletePhieuchidinhcanlamsang(@Args('id', { type: () => String }) id: string) {
    return this.phieuchidinhcanlamsangService.deletePhieuCLS(id);
  }
}
