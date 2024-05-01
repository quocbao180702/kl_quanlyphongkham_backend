import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BacsiService } from './bacsi.service';
import { BacSi } from './entities/bacsi.entity';
import { NewBacSiInput } from './dto/new-bacsi.input';
import { UpdateBacSiInput } from './dto/update-bacsi.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FetchPagination } from 'src/types/fetchPagination.input';
import { UserRole } from 'src/types/Users.types';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { HasRoles } from 'src/auth/dto/has-roles.decorator';
import { CreateLichkhamInput } from 'src/lichkham/dto/create-lichkham.input';
import { Users } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Resolver(() => BacSi)
export class BacsiResolver {

    constructor(private readonly bacsiService: BacsiService,
        private readonly userService: UsersService
    ) { }

    @Query(() => Number, { name: 'CountBacSi' })
    async getCount(): Promise<number> {
        return this.bacsiService.getCount();
    }

   /*  @HasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard) */
    @Query(() => [BacSi])
    async getAllBacSi(@Args('fetchPagination') fetchPagination: FetchPagination): Promise<BacSi[]> {
        return await this.bacsiService.getAllBacSi(fetchPagination);
    }

    /*  @HasRoles(UserRole.ADMIN)
     @UseGuards(JwtAuthGuard, RolesGuard) */
    @Mutation(() => BacSi)
    async createBacSi(@Args('newBacSiInput') newBacSiInput: NewBacSiInput, @Args('createLichkham') createLichkham: CreateLichkhamInput): Promise<BacSi | null> {
        const newBacsi = await this.bacsiService.createBacSi(newBacSiInput, createLichkham);
        return newBacsi;
    }

    /* @HasRoles(UserRole.DOCTOR)
    @UseGuards(JwtAuthGuard, RolesGuard)
    */
    @Query(() => BacSi, { nullable: true })
    async getBacSibyUserId(@Args('user') user: string): Promise<BacSi | null> {
        return await this.bacsiService.getBacSibyUserId(user)
    }

    @HasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Mutation(() => BacSi)
    async updateBacSi(@Args('input') input: UpdateBacSiInput): Promise<BacSi> {
        const update = await this.bacsiService.updateBacSi(input);
        if (!update) {
            throw new Error(`User with ID ${input.id} not found.`);
        }
        return update;
    }

    @HasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Mutation(() => Boolean)
    async deleteBacSi(@Args('_id') _id: string): Promise<boolean> {
        await this.bacsiService.deleteBacSi(_id);
        return true;
    }

}
