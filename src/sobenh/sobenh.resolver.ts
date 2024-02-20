import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SobenhService } from './sobenh.service';
import { Sobenh } from './entities/sobenh.entity';
import { CreateSobenhInput } from './dto/create-sobenh.input';
import { UpdateSobenhInput } from './dto/update-sobenh.input';

@Resolver(() => Sobenh)
export class SobenhResolver {
  constructor(private readonly sobenhService: SobenhService) {}

  @Mutation(() => Sobenh)
  createSobenh(@Args('createSobenhInput') createSobenhInput: CreateSobenhInput) {
    return this.sobenhService.createSobenh(createSobenhInput);
  }

  @Query(() => [Sobenh])
  getAllSoBenh() {
    return this.sobenhService.getAllSobenh();
  }

  /* @Query(() => Sobenh, { name: 'sobenh' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sobenhService.findOne(id);
  } */

  @Mutation(() => Sobenh)
  updateSobenh(@Args('updateSobenhInput') updateSobenhInput: UpdateSobenhInput) {
    return this.sobenhService.updateSobenh(updateSobenhInput);
  }

  @Mutation(() => Sobenh)
  deleteSobenh(@Args('id', { type: () => String }) id: string) {
    return this.sobenhService.deleteSobenh(id);
  }
}
