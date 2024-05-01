import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PhienInput {

    @Field()
    batdau: string;

    @Field()
    ketthuc: string;

    @Field()
    trangthai: boolean

    @Field()
    soluongToiDa: number
}