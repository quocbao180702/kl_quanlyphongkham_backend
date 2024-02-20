import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NhanvienService } from './nhanvien.service';
import { NhanVien } from './schemas/nhanvien.schema';
import { NewNhanVienInput } from './dto/new-nhanvien.input';
import { UpdateNhanVienInput } from './dto/update-nhanvien.input';



@Resolver()
export class NhanvienResolver {

    constructor(private readonly nhanVienService: NhanvienService) { }

    @Query(() => [NhanVien])
    async getAllNhanVien(): Promise<NhanVien[]> {
        return await this.nhanVienService.getAllNhanVien();
    }

    @Mutation(() => NhanVien)
    async createNhanVien(@Args('newNhanVienInput') newNhanVienInput: NewNhanVienInput): Promise<NhanVien> {
        const newNhanVien = await this.nhanVienService.createNhanVien(newNhanVienInput);
        return newNhanVien;
    }

    @Mutation(() => NhanVien)
    async updateNhanVien(@Args('_id') _id: string, @Args('input') input: UpdateNhanVienInput): Promise<NhanVien> {
        const update = await this.nhanVienService.updateNhanVien(_id, input);
        if (!update) {
            throw new Error(`User with ID ${_id} not found.`);
        }
        return update;
    }

    @Mutation(() => Boolean)
    async deleteNhanVien(@Args('_id') _id: string): Promise<boolean>{
        await this.nhanVienService.deleteNhanVien(_id);
        return true;
    }
}
