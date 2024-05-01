import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LichkhamService } from './lichkham.service';
import { Lichkham } from './entities/lichkham.entity';
import { CreateLichkhamInput } from './dto/create-lichkham.input';
import { UpdateLichkhamInput } from './dto/update-lichkham.input';

@Resolver(() => Lichkham)
export class LichkhamResolver {
  constructor(private readonly lichkhamService: LichkhamService) { }

  @Query(() => [Lichkham])
  async getAllLich(): Promise<Lichkham[] | null> {
    return this.lichkhamService.getAllLich();
  }

  @Query(() => Lichkham)
  async getLichKham(@Args('id') id: string): Promise<Lichkham | null> {
    return this.lichkhamService.getLichbyId(id);
  }

  @Mutation(() => Lichkham)
  async createLichKham(@Args('createLichKham') createLichKham: CreateLichkhamInput): Promise<Lichkham | null> {
    return this.lichkhamService.createLichKham(createLichKham)
  }

  @Mutation(() => Lichkham)
  async updateLichKham(@Args('updateLichkham') updateLichkham: UpdateLichkhamInput): Promise<Lichkham | null> {
    return this.lichkhamService.updateLichKham(updateLichkham);
  }

  @Mutation(() => Boolean)
  async deleteLichKham(@Args('id') id: string): Promise<Boolean> {
    return this.lichkhamService.deleteLichKham(id);
  }
}
