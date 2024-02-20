import { ObjectType, Field, Int, Float, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { BenhNhan } from 'src/benhnhan/schemas/benhnhan.schema';
import { Dichvu } from 'src/dichvu/entities/dichvu.entity';
import { LoaiCanLamSang } from 'src/loaicanlamsang/schemas/loaicanlamsang.entity';
import { Thuoc } from 'src/thuoc/schemas/thuoc.schema';


export type HoadonDocument = HydratedDocument<Hoadon>;

@Schema()
@ObjectType()
export class Hoadon {

  @Field(() => ID)
    _id: mongoose.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'BenhNhan' })
  @Field(() => BenhNhan)
  benhnhan: BenhNhan;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Thuoc' }] })
  @Field(() => [Thuoc])
  thuocs: Thuoc[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'LoaiCanLamSang' }] })
  @Field(() => [LoaiCanLamSang])
  canlamsangs: LoaiCanLamSang[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Dichvu' }] })
  @Field(() => [Dichvu])
  dichvus: Dichvu[];

  @Prop()
  @Field(() => Float)
  thanhtien: number

  @Prop()
  @Field(() => Date)
  ngaytao: Date
}

export const HoadonSchema = SchemaFactory.createForClass(Hoadon);