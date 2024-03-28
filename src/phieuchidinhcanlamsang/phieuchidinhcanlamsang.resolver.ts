import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PhieuchidinhcanlamsangService } from './phieuchidinhcanlamsang.service';
import { Phieuchidinhcanlamsang } from './entities/phieuchidinhcanlamsang.entity';
import { CreatePhieuchidinhcanlamsangInput } from './dto/create-phieuchidinhcanlamsang.input';
import { UpdatePhieuchidinhcanlamsangInput } from './dto/update-phieuchidinhcanlamsang.input';
import { CreateKetquacanlamsangInput } from 'src/ketquacanlamsang/dto/create-ketquacanlamsang.input';

@Resolver(() => Phieuchidinhcanlamsang)
export class PhieuchidinhcanlamsangResolver {
  constructor(private readonly phieuchidinhcanlamsangService: PhieuchidinhcanlamsangService) { }

  @Mutation(() => Phieuchidinhcanlamsang)
  createPhieuchidinhcanlamsang(
    @Args('createPhieuchidinhcanlamsangInput') createPhieuchidinhcanlamsangInput: CreatePhieuchidinhcanlamsangInput,
    @Args('createKetQuaCLSList', { type: () => [CreateKetquacanlamsangInput] }) createKetQuaCLSList: CreateKetquacanlamsangInput[],
  ) {
    return this.phieuchidinhcanlamsangService.createPhieuCLS(createPhieuchidinhcanlamsangInput, createKetQuaCLSList);
  }


  @Query(() => [Phieuchidinhcanlamsang])
  getAllPhieuCLS() {
    return this.phieuchidinhcanlamsangService.getAllPhieuCLS();
  }

  @Query(() => Phieuchidinhcanlamsang, {nullable: true})
  async getPhieuCanLamSangbyPhieuXacNhanId(@Args('phieuxacnhan') phieuxacnhan: string): Promise<Phieuchidinhcanlamsang | null>{
    return this.phieuchidinhcanlamsangService.getPhieuCanLamSangbyPhieuXacNhanId(phieuxacnhan)
  }

  @Query(() => [Phieuchidinhcanlamsang])
  getAllPhieuCLSbyNgay(@Args('ngaytao') ngaytao: Date, @Args('trangthai') trangthai: boolean) {
    return this.phieuchidinhcanlamsangService.getAllPhieuCLSbyNgay(ngaytao, trangthai);
  }

  @Mutation(() => Phieuchidinhcanlamsang)
  async updateTrangThaiCanLamSang(@Args('id') id: string): Promise<Phieuchidinhcanlamsang | null> {
    return await this.phieuchidinhcanlamsangService.updateTrangThaiCanLamSang(id)
  }

  @Mutation(() => Phieuchidinhcanlamsang)
  updatePhieuchidinhcanlamsang(@Args('updatePhieuchidinhcanlamsangInput') updatePhieuchidinhcanlamsangInput: UpdatePhieuchidinhcanlamsangInput) {
    return this.phieuchidinhcanlamsangService.updatePhieuCLS(updatePhieuchidinhcanlamsangInput);
  }

  @Mutation(() => Phieuchidinhcanlamsang)
  deletePhieuchidinhcanlamsang(@Args('id', { type: () => String }) id: string) {
    return this.phieuchidinhcanlamsangService.deletePhieuCLS(id);
  }
}
