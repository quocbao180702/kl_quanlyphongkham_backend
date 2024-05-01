import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Phienkham } from 'src/types/phienkham.types';


export type LichkhamDocument = HydratedDocument<Lichkham>;

@ObjectType()
@Schema()
export class Lichkham {

  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @Field(() => [Phienkham])
  @Prop({ type: [Phienkham]})
  ngaykham: Phienkham[];

  @Field(() => [Date])
  @Prop()
  ngaynghi: Date[]
}

export const LichkhamSchema = SchemaFactory.createForClass(Lichkham)