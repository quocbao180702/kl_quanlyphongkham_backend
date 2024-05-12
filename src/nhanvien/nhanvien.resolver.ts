import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NhanvienService } from './nhanvien.service';
import { NhanVien } from './entities/nhanvien.entity';
import { NewNhanVienInput } from './dto/new-nhanvien.input';
import { UpdateNhanVienInput } from './dto/update-nhanvien.input';
import { FetchPagination } from 'src/types/fetchPagination.input';



@Resolver()
export class NhanvienResolver {

    constructor(private readonly nhanVienService: NhanvienService) { }

    @Query(() => Number, {name: "CountNhanVien"})
    async CountNhanVien(): Promise<Number | null>{
        return await this.nhanVienService.getCount();
    }

    @Query(() => [NhanVien])
    async getAllNhanVien(@Args('fetchPagination') fetchPagination: FetchPagination): Promise<NhanVien[]> {
        return await this.nhanVienService.getAllNhanVien(fetchPagination);
    }

    @Query(() => NhanVien, {nullable: true})
    async getNhanVienbyUserId(@Args('user') user: string): Promise<NhanVien | null> {
        return await this.nhanVienService.getNhanVienbyUserId(user)
    }

    @Mutation(() => NhanVien)
    async createNhanVien(@Args('newNhanVienInput') newNhanVienInput: NewNhanVienInput): Promise<NhanVien> {
        const newNhanVien = await this.nhanVienService.createNhanVien(newNhanVienInput);
        return newNhanVien;
    }

    @Mutation(() => NhanVien)
    async updateNhanVien(@Args('input') updateNhanVienInput: UpdateNhanVienInput): Promise<NhanVien> {
        const update = await this.nhanVienService.updateNhanVien(updateNhanVienInput);
        if (!update) {
            throw new Error(`Nhân Viên with ID ${updateNhanVienInput.id} not found.`);
        }
        return update;
    }

    @Mutation(() => Boolean)
    async deleteNhanVien(@Args('_id') _id: string): Promise<boolean> {
        await this.nhanVienService.deleteNhanVien(_id);
        return true;
    }
}
