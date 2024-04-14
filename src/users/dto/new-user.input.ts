import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsEmail, IsInt } from 'class-validator';
import { LinkImageInput } from 'src/types/LinkImage.input';
import { LinkImage } from 'src/types/LinkImage.types';
import { UserRole } from 'src/types/Users.types';

@InputType()
export class NewUserInput {
    @Field()
    username: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @MaxLength(8)
    password: string;

    @Field(type => LinkImageInput, {nullable: true})
    avatar: LinkImageInput

    @Field(type => UserRole)
    role: UserRole;

    @Field()
    isLocked: boolean
}