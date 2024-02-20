import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsEmail} from 'class-validator';

@InputType()
export class UpdateUserInput {

    @Field()
    username: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @MaxLength(8)
    password: string;

}