import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Users } from "src/users/entities/user.entity";


@ObjectType()
export class LoginResponse{
    @Field()
    access_token: string;

    @Field()
    success: boolean;

    @Field(() => Int)
    code: number

    /* @Field()
    refresh_token: string;
 */
    /* @Field()
    user:  Users */
}