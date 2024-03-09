import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BenhService } from './benh.service';
import { Benh } from './entities/benh.entity';
import { NewBenhInput } from './dto/new-benh.input';
import { UpdateBenhInput } from './dto/update-benh.input';

@Resolver()
export class BenhResolver {

    constructor(private readonly benhService: BenhService){}

    @Query(() => [Benh])
    async getAllBenh(): Promise<Benh[]> {
        return await this.benhService.getAllBenh();
    }

    @Mutation(() => Benh)
    async createBenh(@Args('newBenhInput') newBenhInput: NewBenhInput): Promise<Benh | null> {
        const newBenh = await this.benhService.createBenh(newBenhInput);
        return newBenh;
    }


    @Mutation(() => Benh)
    async updateBenh(@Args('input') input: UpdateBenhInput): Promise<Benh | null> {
        const update = await this.benhService.updateBenh(input);
        if (!update) {
            throw new Error(`Benh with ID ${input.id} not found.`);
        }
        return update;
    }

    @Mutation(() => Boolean)
    async deleteBenh(@Args('_id') _id: string): Promise<boolean>{
        await this.benhService.deleteBenh(_id);
        return true;
    }

}
