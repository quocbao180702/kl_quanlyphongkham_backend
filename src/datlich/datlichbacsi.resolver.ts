import { DatLichBacSiService } from "./datlichbacsi.service";
import { NewDatLichBacSiInput } from "./dto/new-datlichBacSi.input";
import { UpdateDatLichBacSiInput } from "./dto/update-datlichbacsi.input";
import { DatLichBacSi } from "./entities/datlicbacsi.entity";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";


@Resolver()
export class DatlichBacSiResolver {

    constructor(private readonly datlichBacSiService: DatLichBacSiService) { }


    @Query(() => [DatLichBacSi], { nullable: true })
    async getAllDatlichBacSi(): Promise<DatLichBacSi[]> {
        return await this.datlichBacSiService.getAllDatLichBacSi();
    }

    @Query(() => [DatLichBacSi], { nullable: true })
    async getAllDatLichBacSiByTrangThai(@Args('trangthai') trangthai: string): Promise<DatLichBacSi[]> {
        return await this.datlichBacSiService.getAllDatLichBacSiByTrangThai(trangthai);
    }

    @Mutation(() => DatLichBacSi)
    async createDatlichBacSi(@Args('createDatlichBacSi') createDatlichBacSi: NewDatLichBacSiInput): Promise<DatLichBacSi | null> {
        return await this.datlichBacSiService.createDatlichBacSi(createDatlichBacSi);
    }

    @Mutation(() => DatLichBacSi)
    async updateDatlichBacSi(@Args('updateDatlichBacSi') updateDatlichBacSi: UpdateDatLichBacSiInput): Promise<DatLichBacSi | null> {
        return await this.datlichBacSiService.updateDatLichBacSi(updateDatlichBacSi);
    }

    @Mutation(() => DatLichBacSi)
    async updateTrangThaiDatLichBacSi(@Args('id') id: string, @Args('trangthai') trangthai: string): Promise<DatLichBacSi | null> {
        return await this.datlichBacSiService.updateTrangThaiDatLichBacSi(id, trangthai);
    }

    @Mutation(() => Boolean)
    async deleteDatLichBacSi(@Args('_id') _id: string): Promise<boolean> {
        await this.datlichBacSiService.deleteDatLichBacSi(_id);
        return true;
    }
}