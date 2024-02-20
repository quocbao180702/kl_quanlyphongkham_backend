import { ObjectType, Field, Int, Float, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Schema as MongooSchemas } from 'mongoose';
import { Hoadon } from 'src/hoadon/entities/hoadon.entity';


export type DichvuDocument = HydratedDocument<Dichvu>;

@Schema()
@ObjectType()
export class Dichvu {

  @Field(() => ID)
    _id: mongoose.Types.ObjectId;

  @Field()
  @Prop()
  tendichvu: string;

  @Field(() => Float)
  @Prop()
  gia: number;


  @Field(() => Boolean)
  @Prop()
  bhyt: boolean;


  @Field(() => Int)
  @Prop()
  soluong: number;

  @Field()
  @Prop()
  dvt: string;

  @Field(() => [Hoadon])
  @Prop({ type: [{ type: MongooSchemas.Types.ObjectId, ref: 'Hoadon', require: true }] })
  hoadons: Hoadon[];
}

export const DichvuSchema = SchemaFactory.createForClass(Dichvu);