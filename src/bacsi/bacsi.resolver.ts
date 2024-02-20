import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BacsiService } from './bacsi.service';
import { BacSi } from './schemas/bacsi.schema';
import { NewBacSiInput } from './dto/new-bacsi.input';
import { UpdateBacSiInput } from './dto/update-bacsi.input';

@Resolver()
export class BacsiResolver {

    constructor(private readonly bacsiService: BacsiService) { }

    @Query(() => [BacSi])
    async getAllBacSi(): Promise<BacSi[]> {
        return await this.bacsiService.getAllBacSi();
    }

    @Mutation(() => BacSi)
    async createBacSi(@Args('newBacSiInput') newBacSiInput: NewBacSiInput): Promise<BacSi | null> {
        const newBacsi = await this.bacsiService.createBacSi(newBacSiInput);
        return newBacsi;
    }

    @Mutation(() => BacSi)
    async updateBacSi(@Args('_id') _id: string, @Args('input') input: UpdateBacSiInput): Promise<BacSi> {
        const update = await this.bacsiService.updateBacSi(_id, input);
        if (!update) {
            throw new Error(`User with ID ${_id} not found.`);
        }
        return update;
    }

    @Mutation(() => Boolean)
    async deleteBacSi(@Args('_id') _id: string): Promise<boolean>{
        await this.bacsiService.deleteBacSi(_id);
        return true;
    }

}
