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
import { FetchPagination } from "src/types/fetchPagination.input";
import { HasRoles } from "src/auth/dto/has-roles.decorator";
import { UserRole } from "src/types/Users.types";
import { RolesGuard } from "src/auth/guards/roles.guard";

@Resolver(() => BenhNhan)
export class BenhNhanResolver {
    constructor(private readonly benhnhanService: BenhnhanService,
        private readonly sinhhieuService: SinhhieuService
    ) { }


    @Query(() => Number, { name: 'CountBenhNhan' })
    async getCount(): Promise<number> {
        return this.benhnhanService.getCount();
    }

    @HasRoles(UserRole.ADMIN, UserRole.STAFF)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Query(() => [BenhNhan])
    async getAllBenhNhan(@Args('fetchPagination') fetchPagination: FetchPagination): Promise<BenhNhan[] | null> {
        return await this.benhnhanService.getAllBenhNhan(fetchPagination);
    }

    @Query(() => [BenhNhan])
    async getAllBenhNhanNoPagination(): Promise<BenhNhan[] | null> {
        return await this.benhnhanService.getAllBenhNhanNoPagination();
    }

    @HasRoles(UserRole.ADMIN, UserRole.STAFF)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Query(() => BenhNhan)
    async getBenhNhanbyId(@Args('id') id: string): Promise<BenhNhan | null> {
        return await this.benhnhanService.getBenhNhanbyId(id);
    }

    @Query(() => BenhNhan, { nullable: true })
    async getBenhNhanbyUserId(@Args('user') user: string): Promise<BenhNhan | null> {
        return await this.benhnhanService.getBenhNhanbyUserId(user);
    }
    @ResolveField(() => Sinhhieu, { name: 'sinhhieu', nullable: true })
    async getAllSinhHieuByBenhNhan(@Parent() Sinhhieu) {
        const { id } = Sinhhieu;
        return this.sinhhieuService.getAllSinhHieuByBenhNhan(id);
    }

    @HasRoles(UserRole.ADMIN, UserRole.STAFF)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Mutation(() => BenhNhan)
    async createBenhNhan(@Args('newBenhNhanInput') newBenhNhanInput: NewBenhNhanInput): Promise<BenhNhan> {
        const benhnhanNew = await this.benhnhanService.createBenhNhan(newBenhNhanInput);
        return benhnhanNew;
    }

    @HasRoles(UserRole.ADMIN, UserRole.STAFF)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Mutation(() => BenhNhan)
    async updateBenhNhan(@Args('input') input: UpdateBenhNhanInput): Promise<BenhNhan> {
        const update = await this.benhnhanService.updateBenhNhan(input);
        if (!update) {
            throw new Error(`User with ID ${input._id} not found.`);
        }
        return update;
    }

    @HasRoles(UserRole.ADMIN, UserRole.STAFF)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Mutation(() => Boolean)
    async deleteBenhNhan(@Args('_id') _id: string): Promise<boolean> {
        await this.benhnhanService.deleteBenhNhan(_id);
        return true;
    }
}