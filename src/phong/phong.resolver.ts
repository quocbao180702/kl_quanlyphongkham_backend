import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { PhongService } from './phong.service';
import { Phong } from './schemas/phong.schema';
import { NewPhongInput } from './dto/new-phong.input';
import { UpdatePhongInput } from './dto/update-phong.input';
import { Schema as MongooseSchema } from "mongoose";

@Resolver()
export class PhongResolver {

    constructor(private readonly phongService: PhongService) { }

    @Query(() => [Phong])
    async getAllPhong(): Promise<Phong[]> {
        return await this.phongService.getAllPhong();
    }

    @Mutation(() => Phong)
    async createPhong(@Args('newPhongInput') newPhongInput: NewPhongInput): Promise<Phong | null> {
        const newPhong = await this.phongService.createPhong(newPhongInput);
        return newPhong;
    }

    @Mutation(() => Phong)
    async updatePhong( @Args('input') input: UpdatePhongInput): Promise<Phong | null> {
        const update = await this.phongService.updatePhong(input);
        if (!update) {
            throw new Error(`Phong with ID ${input.id} not found.`);
        }
        return update;
    }

    @Mutation(() => Boolean)
    async deletePhong(@Args('_id') _id: string): Promise<boolean>{
        await this.phongService.deletePhong(_id);
        return true;
    }
}
