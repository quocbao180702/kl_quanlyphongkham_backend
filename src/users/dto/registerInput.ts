import { Field, InputType } from "@nestjs/graphql";
import { LinkImageInput } from "src/types/LinkImage.input";

@InputType()
export class RegisterInput {

    @Field()
    username: string

    @Field()
    email: string

    @Field()
    password: string


    @Field(type => LinkImageInput, { nullable: true })
    avatar: LinkImageInput

}