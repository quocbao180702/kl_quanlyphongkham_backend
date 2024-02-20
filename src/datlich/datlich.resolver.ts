import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DatlichService } from './datlich.service';
import { DatLich } from './schemas/datlich.schema';
import { NewDatLichInput } from './dto/new-datlich.input';
import { UpdateDatLichInput } from './dto/update-datlich.input';

@Resolver()
export class DatlichResolver {
    constructor(private readonly datlichService: DatlichService){}

    @Query(() => [DatLich])
    async getAllDatLich(): Promise<DatLich[]>{
        return await this.datlichService.getAllDatLich();
    }

    @Mutation(() => DatLich)
    async createDatLich(@Args('newDatLichInput') newDatLichInput: NewDatLichInput): Promise<DatLich|null>{
        const newDatLich = await this.datlichService.createDatLich(newDatLichInput);
        return newDatLich;
    }

    @Mutation(() => DatLich)
    async updateDatLich(@Args('input') input: UpdateDatLichInput): Promise<DatLich | null> {
        const update = await this.datlichService.updateDatLich(input);
        if (!update) {
            throw new Error(`User with ID ${input.id} not found.`);
        }
        return update;
    }

    @Mutation(() => Boolean)
    async deleteDatLich(@Args('_id') _id: string): Promise<boolean>{
        await this.datlichService.deleteDatLich(_id);
        return true;
    }


}
