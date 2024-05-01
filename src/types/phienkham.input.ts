import { Field, InputType } from "@nestjs/graphql"
import { PhienInput } from "./phiens.input"

@InputType()
export class PhienkhamInput {

    @Field(() => [PhienInput])
    phiens: PhienInput[]

    @Field(() => String)
    ngaytrongtuan: string

}