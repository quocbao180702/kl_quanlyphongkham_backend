import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BacsiService } from './bacsi.service';
import { BacSi } from './entities/bacsi.entity';
import { NewBacSiInput } from './dto/new-bacsi.input';
import { UpdateBacSiInput } from './dto/update-bacsi.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver()
export class BacsiResolver {

    constructor(private readonly bacsiService: BacsiService) { }

    @UseGuards(JwtAuthGuard)
    @Query(() => [BacSi])
    async getAllBacSi(): Promise<BacSi[]> {
        return await this.bacsiService.getAllBacSi();
    }

    @Mutation(() => BacSi)
    async createBacSi(@Args('newBacSiInput') newBacSiInput: NewBacSiInput/* , @Args('username') username: string */): Promise<BacSi | null> {
        const newBacsi = await this.bacsiService.createBacSi(newBacSiInput/* , username */);
        return newBacsi;
    }

    @Mutation(() => BacSi)
    async updateBacSi(@Args('input') input: UpdateBacSiInput): Promise<BacSi> {
        const update = await this.bacsiService.updateBacSi(input);
        if (!update) {
            throw new Error(`User with ID ${input.id} not found.`);
        }
        return update;
    }

    @Mutation(() => Boolean)
    async deleteBacSi(@Args('_id') _id: string): Promise<boolean>{
        await this.bacsiService.deleteBacSi(_id);
        return true;
    }

}
