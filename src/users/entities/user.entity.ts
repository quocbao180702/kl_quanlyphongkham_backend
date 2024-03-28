import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {
    HydratedDocument, Schema as MongooSchema
} from 'mongoose';
import { LinkImage } from 'src/types/LinkImage.types';
import { UserRole } from 'src/types/Users.types';


export type UsersDocument = HydratedDocument<Users>;

@Schema()
@ObjectType()
export class Users {

    @Field(() => ID)
    _id: mongoose.Types.ObjectId;

    @Field()
    @Prop({ unique: true, sparse: true })
    username: string;


    @Field()
    @Prop()
    email: string;

    @Field()
    @Prop()
    password: string;

    @Field()
    @Prop({default: false})
    thongtin: boolean;

    @Field(type => UserRole)
    @Prop({ enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @Field(type => LinkImage)
    @Prop({ type: LinkImage })
    avatar: LinkImage;

    @Field()
    @Prop({ default: false })
    isLocked: boolean

    @Field()
    @Prop({ nullable: true, default: '' })
    refreshToken: string

}

export const UsersSchema = SchemaFactory.createForClass(Users);