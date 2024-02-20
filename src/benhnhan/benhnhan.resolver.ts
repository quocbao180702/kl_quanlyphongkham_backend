import { Schema as MongooseSchema } from "mongoose";
import { BenhnhanService } from "./benhnhan.service";
import { NewBenhNhanInput } from "./dto/new-benhnhan.input";
import { UpdateBenhNhanInput } from "./dto/update-benhnhan.input";
import { BenhNhan } from "./schemas/benhnhan.schema";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

@Resolver(() => BenhNhan)
export class BenhNhanResolver{
    constructor(private readonly benhnhanService: BenhnhanService){}

    @Query(() => [BenhNhan])
    async getAllBenhNhan(): Promise<BenhNhan[]>{
        return await this.benhnhanService.getAllBenhNhan();
    }

    @Mutation(() => BenhNhan)
    async createBenhNhan(@Args('newBenhNhanInput') newBenhNhanInput: NewBenhNhanInput): Promise<BenhNhan>{
        const benhnhanNew = await this.benhnhanService.createBenhNhan(newBenhNhanInput);
        return benhnhanNew;
    }

    @Mutation(() => BenhNhan)
    async updateBenhNhan(@Args('input') input: UpdateBenhNhanInput): Promise<BenhNhan> {
        const update = await this.benhnhanService.updateBenhNhan(input);
        if (!update) {
            throw new Error(`User with ID ${input._id} not found.`);
        }
        return update;
    }

    @Mutation(() => Boolean)
    async deleteBenhNhan(@Args('_id') _id: string): Promise<boolean> {
        await this.benhnhanService.deleteBenhNhan(_id);
        return true;
    }
}