import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DichvuService } from './dichvu.service';
import { Dichvu } from './entities/dichvu.entity';
import { CreateDichvuInput } from './dto/create-dichvu.input';
import { UpdateDichvuInput } from './dto/update-dichvu.input';

@Resolver(() => Dichvu)
export class DichvuResolver {
  constructor(private readonly dichvuService: DichvuService) {}

  @Mutation(() => Dichvu)
  createDichvu(@Args('createDichvuInput') createDichvuInput: CreateDichvuInput) {
    return this.dichvuService.createDichVu(createDichvuInput);
  }

  @Query(() => [Dichvu])
  getAllDichVu() {
    return this.dichvuService.getAllDichVu();
  }

  /* @Query(() => Dichvu, { name: 'dichvu' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.dichvuService.findOne(id);
  } */

  @Mutation(() => Dichvu)
  updateDichvu(@Args('updateDichvuInput') updateDichvuInput: UpdateDichvuInput) {
    return this.dichvuService.updateDichVu(updateDichvuInput);
  }

  @Mutation(() => Dichvu)
  deleteDichvu(@Args('id', { type: () => String }) id: string) {
    return this.dichvuService.deleteDichVu(id);
  }
}
