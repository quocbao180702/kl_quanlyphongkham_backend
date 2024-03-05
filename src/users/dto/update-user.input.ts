import { Field, ID, InputType } from '@nestjs/graphql';
import { MaxLength, IsEmail} from 'class-validator';
import { LinkImageInput } from 'src/types/LinkImage.input';
import { UserRole } from 'src/types/Users.types';

@InputType()
export class UpdateUserInput {

    @Field(() => String)
    id: string;

    @Field()
    username: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @MaxLength(8)
    password: string;

    @Field()
    phoneNumber: string

    @Field(type => LinkImageInput)
    avatar: LinkImageInput

    @Field(type => UserRole)
    role: UserRole;
}