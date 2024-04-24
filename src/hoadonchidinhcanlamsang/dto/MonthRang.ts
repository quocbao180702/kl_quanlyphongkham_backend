import { Field, Float, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MonthRangeCLS{
    @Field()
    month: number;

    @Field(() => Float)
    tongtien: number
}