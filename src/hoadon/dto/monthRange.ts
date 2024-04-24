import { Field, Float, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MongthRange{
    @Field()
    month: number;

    @Field(() => Float)
    tongtien: number
}