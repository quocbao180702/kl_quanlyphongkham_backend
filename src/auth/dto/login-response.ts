import { Field, ObjectType } from "@nestjs/graphql";
import { Users } from "src/users/schemas/user.schema";


@ObjectType()
export class LoginResponse{
    @Field()
    access_token: string;

   /*  @Field()
    refresh_token: string; */

    @Field()
    user:  Users
}