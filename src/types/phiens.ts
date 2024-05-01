import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Phiens{

    @Field()
    batdau: string

    @Field()
    ketthuc: string

    @Field()
    trangthai: boolean

    @Field()
    soluongToiDa: number
}