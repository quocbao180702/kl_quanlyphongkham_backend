import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VattuyteService } from './vattuyte.service';
import { Vattuyte } from './entities/vattuyte.entity';
import { CreateVattuyteInput } from './dto/create-vattuyte.input';
import { UpdateVattuyteInput } from './dto/update-vattuyte.input';

@Resolver(() => Vattuyte)
export class VattuyteResolver {
  constructor(private readonly vattuyteService: VattuyteService) { }

  @Mutation(() => Vattuyte)
  createVatTuYTe(@Args('createDichvuInput') createVattuyteInput: CreateVattuyteInput) {
    return this.vattuyteService.createVatTuYTe(createVattuyteInput);
  }

  @Query(() => [Vattuyte])
  getAllVatTuYTe() {
    return this.vattuyteService.getAllVatTuYTe();
  }

  @Mutation(() => Vattuyte)
  updateVatTuYTe(@Args('updateDichvuInput') updateVattuyteInput: UpdateVattuyteInput) {
    return this.vattuyteService.updateVatTuYTe(updateVattuyteInput);
  }

  @Mutation(() => Boolean)
  async deleteVatTuYTe(@Args('id', { type: () => String }) id: string): Promise<boolean> {
    return await this.vattuyteService.deleteVatTuYTe(id);
  }


}
