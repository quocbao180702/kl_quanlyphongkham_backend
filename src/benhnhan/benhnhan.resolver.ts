import { Schema as MongooseSchema } from "mongoose";
import { BenhnhanService } from "./benhnhan.service";
import { NewBenhNhanInput } from "./dto/new-benhnhan.input";
import { UpdateBenhNhanInput } from "./dto/update-benhnhan.input";
import { BenhNhan } from "./entities/benhnhan.entity";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Sinhhieu } from "src/sinhhieu/entities/sinhhieu.entity";
import { SinhhieuService } from "src/sinhhieu/sinhhieu.service";

@Resolver(() => BenhNhan)
export class BenhNhanResolver {
    constructor(private readonly benhnhanService: BenhnhanService,
        private readonly sinhhieuService: SinhhieuService
    ) { }


    /* @UseGuards(JwtAuthGuard) */
    @Query(() => [BenhNhan])
    async getAllBenhNhan(): Promise<BenhNhan[] | null> {
        return await this.benhnhanService.getAllBenhNhan();
    }

    /* @UseGuards(JwtAuthGuard) */
    @Query(() => BenhNhan)
    async getBenhNhanbyId(@Args('id') id: string): Promise<BenhNhan | null> {
        return await this.benhnhanService.getBenhNhanbyId(id);
    }

    @ResolveField(() => Sinhhieu, {name: 'sinhhieu'})
    async getAllSinhHieuByBenhNhan(@Parent() Sinhhieu) {
        const { id } = Sinhhieu;
        return this.sinhhieuService.getAllSinhHieuByBenhNhan( id );
    }

    @Mutation(() => BenhNhan)
    async createBenhNhan(@Args('newBenhNhanInput') newBenhNhanInput: NewBenhNhanInput): Promise<BenhNhan> {
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