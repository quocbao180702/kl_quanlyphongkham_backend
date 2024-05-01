import { Field, ObjectType } from "@nestjs/graphql"
import { Phiens } from "./phiens"

@ObjectType()
export class Phienkham{

    @Field(() => [Phiens])
    phiens: Phiens[]

    @Field(() => String)
    ngaytrongtuan: string

}