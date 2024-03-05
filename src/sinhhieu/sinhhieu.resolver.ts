import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SinhhieuService } from './sinhhieu.service';
import { Sinhhieu } from './entities/sinhhieu.entity';
import { CreateSinhhieuInput } from './dto/create-sinhhieu.input';
import { UpdateSinhhieuInput } from './dto/update-sinhhieu.input';

@Resolver(() => Sinhhieu)
export class SinhhieuResolver {
  constructor(private readonly sinhhieuService: SinhhieuService) {}

  @Mutation(() => Sinhhieu)
  createSinhhieu(@Args('createSinhhieuInput') createSinhhieuInput: CreateSinhhieuInput) {
    return this.sinhhieuService.createSinhhieu(createSinhhieuInput);
  }

  @Query(() => [Sinhhieu])
  getAllSinhhieu() {
    return this.sinhhieuService.getAllSinhhieu();
  }

  @Query(() => Sinhhieu)
  getAllSinhHieuByBenhNhan(@Args('benhnhanId') benhnhanId: string) {
    return this.sinhhieuService.getAllSinhHieuByBenhNhan(benhnhanId);
  }

  /* @Query(() => Sinhhieu)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sinhhieuService.findOne(id);
  } */

  @Mutation(() => Sinhhieu)
  updateSinhhieu(@Args('updateSinhhieuInput') updateSinhhieuInput: UpdateSinhhieuInput) {
    return this.sinhhieuService.updateSinhhieu(updateSinhhieuInput);
  }

  @Mutation(() => Sinhhieu)
  deleteSinhhieu(@Args('id', { type: () => String }) id: string) {
    return this.sinhhieuService.deleteSinhhieu(id);
  }
}
