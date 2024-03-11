import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ThuocService } from './thuoc.service';
import { Thuoc } from './entities/thuoc.entity';
import { NewThuocInput } from './dto/new-thuoc.input';
import { UpdateThuocInput } from './dto/update-thuoc.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver()
export class ThuocResolver {

    constructor(private readonly thuocService: ThuocService) { }


    @UseGuards(JwtAuthGuard)
    @Query(() => [Thuoc])
    async getAllThuoc(): Promise<Thuoc[]> {
        return await this.thuocService.getAllThuoc();
    }

    @Query(() => [Thuoc])
    async getThuocbyIds(@Args('ids', { type: () => [String] }) ids: string[]): Promise<Thuoc[]> {
        return await this.thuocService.getThuocbyIds(ids);
    }

    @Mutation(() => Thuoc)
    async createThuoc(@Args('newThuocInput') newThuocInput: NewThuocInput): Promise<Thuoc> {
        const thuoc = await this.thuocService.createThuoc(newThuocInput);
        return thuoc;
    }

    @Mutation(() => Thuoc)
    async updateSoluongThuoc(@Args('id')id: string, @Args('soluongdung')soluongdung: number): Promise<Thuoc> {
        return await this.thuocService.updateSoluongThuoc(id, soluongdung);
    }

    @Mutation(() => Thuoc)
    async updateThuoc(@Args('input') input: UpdateThuocInput): Promise<Thuoc> {
        const update = await this.thuocService.updateThuoc(input);
        if (!update) {
            throw new Error(`Thuoc with ID ${input.id} not found.`);
        }
        return update;
    }

    @Mutation(() => Boolean)
    async deleteThuoc(@Args('_id') _id: string): Promise<boolean> {
        await this.thuocService.deleteThuoc(_id);
        return true;
    }
}
