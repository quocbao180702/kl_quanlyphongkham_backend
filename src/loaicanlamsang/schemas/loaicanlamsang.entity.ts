import { ObjectType, Field, Int, Float, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Schema as MongooSchemas } from 'mongoose';
import { Hoadon } from 'src/hoadon/entities/hoadon.entity';

export type LoaiCanLamSangDocument = HydratedDocument<LoaiCanLamSang>;

@Schema()
@ObjectType()
export class LoaiCanLamSang {

  @Field(() => ID)
    _id: mongoose.Types.ObjectId;

  @Prop()
  @Field()
  tenxetnghiem: string;

  @Prop()
  @Field(() => Float)
  gia: number;

  @Prop()
  @Field()
  mota: string;

  @Field(() => [Hoadon])
  @Prop({ type: [{ type: MongooSchemas.Types.ObjectId, ref: 'Hoadon', require: true }] })
  hoadons: Hoadon[];
}


export const LoaiCanLamSangSchema = SchemaFactory.createForClass(LoaiCanLamSang);