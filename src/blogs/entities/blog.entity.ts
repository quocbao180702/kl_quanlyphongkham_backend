import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { LinkImage } from 'src/types/LinkImage.types';
import { Users } from 'src/users/entities/user.entity';



export type BlogDocument = HydratedDocument<Blog>;

@Schema()
@ObjectType()
export class Blog {

  @Field(() => ID)
  _id: string; // Sử dụng kiểu string cho _id

  @Field(type => Users)
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Users', required: true })
  user: Users;

  @Field(type => LinkImage)
  @Prop({ type: LinkImage })
  hinhanh: LinkImage

  @Field()
  @Prop()
  tieude: string;

  @Field({ nullable: true })
  @Prop()
  tomtat: string;

  @Field()
  @Prop()
  noidung: string;

  @Field(() => Int)
  @Prop({ default: 0 })
  luotxem: number;

  @Field(() => Boolean)
  @Prop({ default: false })
  kichhoat: boolean

  @Field(() => Date)
  @Prop({ default: Date.now() })
  ngaytao: Date

}



export const BlogSchema = SchemaFactory.createForClass(Blog);

