import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Schema as MongooSchema } from 'mongoose';
import { BacSi } from 'src/bacsi/entities/bacsi.entity';
import { Benh } from 'src/benh/entities/benh.entity';
import { BenhNhan } from 'src/benhnhan/entities/benhnhan.entity';
import { Thuoc } from 'src/thuoc/entities/thuoc.entity';


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
