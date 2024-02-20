import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Schema as MongooSchema
} from 'mongoose';


export type UsersDocument = HydratedDocument<Users>;

@Schema()
@ObjectType()
export class Users {

    @Field(() => ID)
    _id: mongoose.Types.ObjectId;

    @Field()
    @Prop()
    userId: string;

    @Field()
    @Prop({ unique: true })
    username: string;

    @Field()
    @Prop()
    email: string;

    @Field()
    @Prop()
    password: string;

    @Field()
    @Prop({ type: Number })
    role: number;
}

export const UsersSchema = SchemaFactory.createForClass(Users);