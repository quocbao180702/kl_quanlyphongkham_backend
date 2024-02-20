import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsEmail, IsInt } from 'class-validator';

@InputType()
export class NewUserInput {

    @Field()
    userId: string;

    @Field()
    username: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @MaxLength(8)
    password: string;

    @Field()
    @IsInt()
    role: number;

}