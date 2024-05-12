import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { LinkImage } from 'src/types/LinkImage.types';


export type NhanVienDocument = HydratedDocument<Test>;


@ObjectType()
@Schema()
export class Test {
  
  @Field(() => ID)
  _id: mongoose.Types.ObjectId;


  /* @Prop({type: [LinkImage]})
  @Field(() => [LinkImage])
  listImages: LinkImage[] */


  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
  age: string

  @Prop()
  @Field()
  adress: string;


}


export const TestSchema = SchemaFactory.createForClass(Test);