import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChuyenkhoaService } from './chuyenkhoa.service';
import { ChuyenKhoa } from './schemas/chuyenkhoa.schema';
import { NewChuyenKhoaInput } from './dto/new-chuyenkhoa.input';
import { UpdateChuyenKhoaInput } from './dto/update-chuyenkhoa.input';


@Resolver()
export class ChuyenkhoaResolver {
    constructor(private readonly chuyenkhoaService: ChuyenkhoaService){}

    @Query(() => [ChuyenKhoa])
    async getAllChuyenKhoa(): Promise<ChuyenKhoa[]>{
        return await this.chuyenkhoaService.getAllChuyenKhoa();
    }

    @Mutation(() => ChuyenKhoa)
    async createChuyenKhoa(@Args('newChuyenKhoaInput') newChuyenKhoaInput: NewChuyenKhoaInput): Promise<ChuyenKhoa | null>{
        const newChuyenKhoa = await this.chuyenkhoaService.createChuyenKhoa(newChuyenKhoaInput);
        return newChuyenKhoa;
    }

    @Mutation(() => ChuyenKhoa)
    async updateChuyenKhoa(@Args('updateChuyenKhoaInput') updateChuyenKhoaInput: UpdateChuyenKhoaInput): Promise<ChuyenKhoa | null>{
        const update = await this.chuyenkhoaService.updateChuyenKhoa(updateChuyenKhoaInput);
        if(!update){
            throw new Error(`Chuyen Khoa with ID ${updateChuyenKhoaInput.id} not found`);
        }
        return update;
    }

    @Mutation(() => Boolean)
    async deleteChuyenKhoa(@Args('_id') _id: string): Promise<boolean>{
        await this.chuyenkhoaService.deleteChuyenKhoa(_id);
        return true;
    }
}
