import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Schema as MongooSchema } from 'mongoose';
import { BacSi } from 'src/bacsi/schemas/bacsi.schema';
import { Benh } from 'src/benh/schemas/benh.schema';
import { BenhNhan } from 'src/benhnhan/schemas/benhnhan.schema';
import { Thuoc } from 'src/thuoc/schemas/thuoc.schema';


export type ToathuocDocument = HydratedDocument<Toathuoc>;
@ObjectType()
@Schema()
export class Toathuoc {

  @Field(() => ID)
    _id: mongoose.Types.ObjectId;

  @Prop({ type: MongooSchema.Types.ObjectId, ref: 'BenhNhan' })
  @Field(() => BenhNhan)
  benhnhan: BenhNhan;

  @Prop({ type: MongooSchema.Types.ObjectId, ref: 'BacSi' })
  @Field(() => BacSi)
  bacsi: BacSi;

  @Prop({ type: [{ type: MongooSchema.Types.ObjectId, ref: 'Thuoc', required: true }] })
  @Field(() => [Thuoc])
  thuocs: Thuoc[];

  @Prop({ type: [{ type: MongooSchema.Types.ObjectId, ref: 'Benh', required: true }] })
  @Field(() => [Benh])
  benhs: Benh[];

  @Prop()
  @Field()
  bhyt: Boolean;

  @Prop()
  @Field()
  ngaytaikham: Date;

  @Prop()
  @Field()
  ngaytao: Date;
}

export const ToathuocSchema = SchemaFactory.createForClass(Toathuoc);
