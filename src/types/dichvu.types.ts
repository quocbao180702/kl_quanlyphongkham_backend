import { Field, Float, InputType, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class DichVu{
    @Field()
    ten: string

    @Field(() => Float)
    gia: number

    @Field(() => Int)
    soluong: number

    @Field(() => Float)
    thanhtien: number
}

@InputType()
export class DichVuInput{
    @Field()
    ten: string

    @Field(() => Float)
    gia: number

    @Field(() => Int)
    soluong: number

    @Field(() => Float)
    thanhtien: number
}