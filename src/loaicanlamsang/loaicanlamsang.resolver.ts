import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LoaicanlamsangService } from './loaicanlamsang.service';
import { LoaiCanLamSang } from './entities/loaicanlamsang.entity';
import { UpdateLoaicanlamsangInput } from './dto/update-loaicanlamsang.input';
import { NewLoaiCanLamSangInput } from './dto/new-loaicanlamsang.input';

@Resolver(() => LoaiCanLamSang)
export class LoaicanlamsangResolver {
  constructor(private readonly loaicanlamsangService: LoaicanlamsangService) {}

  @Mutation(() => LoaiCanLamSang)
  async createLoaicanlamsang(@Args('createLoaicanlamsangInput') createLoaicanlamsangInput: NewLoaiCanLamSangInput): Promise<LoaiCanLamSang | null> {
    const newLoaiCLS = await this.loaicanlamsangService.createLoaiCLS(createLoaicanlamsangInput);
    return newLoaiCLS
  }

  @Query(() => [LoaiCanLamSang])
   async getAllLoaiCLS(): Promise<LoaiCanLamSang[]|null> {
    return await this.loaicanlamsangService.getAllLoaiCLS();
  }


  @Mutation(() => LoaiCanLamSang)
  async updateLoaicanlamsang(@Args('updateLoaicanlamsangInput') updateLoaicanlamsangInput: UpdateLoaicanlamsangInput) {
    return await this.loaicanlamsangService.updateLoaiCLS(updateLoaicanlamsangInput);
  }

  @Mutation(() => Boolean)
  async deleteLoaicanlamsang(@Args('id') id: string) {
    await this.loaicanlamsangService.deleteLoaiCLS(id);
    return true;
  }
}
