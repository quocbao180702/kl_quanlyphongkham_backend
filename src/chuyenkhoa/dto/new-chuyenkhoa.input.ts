import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class NewChuyenKhoaInput{
    @Field()
    tenkhoa: string;

    @Field()
    mota: string;
}