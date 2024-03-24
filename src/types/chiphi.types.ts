import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ChiPhi {
    @Field()
    bhyt: boolean

    @Field(() => Float)
    gia: number
}

@InputType()
export class ChiPhiInput {
    @Field()
    bhyt: boolean

    @Field(() => Float)
    gia: number
}