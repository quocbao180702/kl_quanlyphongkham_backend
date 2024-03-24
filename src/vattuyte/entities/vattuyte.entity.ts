import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ChiPhi } from 'src/types/chiphi.types';


export type VattuyteDocument = HydratedDocument<Vattuyte>;

@ObjectType()
@Schema()
export class Vattuyte {

  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @Field()
  @Prop()
  tenvattu: string;

  @Prop(type => [ChiPhi])
  @Field(() => [ChiPhi]) 
  chiphi: ChiPhi[]

  @Field(() => Int)
  @Prop()
  soluong: number;

  @Field()
  @Prop()
  dvt: string;
}

export const VattuyteSchema = SchemaFactory.createForClass(Vattuyte)