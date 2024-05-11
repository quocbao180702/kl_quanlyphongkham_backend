import { Field, Int, InputType } from '@nestjs/graphql'
import { Max, Min } from 'class-validator'

@InputType()
export class FetchPagination {
    @Field(() => Int)
    @Min(0)
    skip = 0

    @Field(() => Int)
    @Min(1)
    @Max(50)
    take = 25

    @Field(() => String, { nullable: true})
    search: string
}