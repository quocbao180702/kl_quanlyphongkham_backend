import { ObjectType, Field, Int, Float, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { BenhNhan } from 'src/benhnhan/entities/benhnhan.entity';
import { Dichvu } from 'src/dichvu/entities/dichvu.entity';
import { LoaiCanLamSang } from 'src/loaicanlamsang/entities/loaicanlamsang.entity';
import { Thuoc } from 'src/thuoc/entities/thuoc.entity';
import { DichVu } from 'src/types/dichvu.types';
import { Vattuyte } from 'src/vattuyte/entities/vattuyte.entity';


export type HoadonDocument = HydratedDocument<Hoadon>;

@Schema()
@ObjectType()
export class Hoadon {

  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'BenhNhan' })
  @Field(() => BenhNhan)
  benhnhan: BenhNhan;

  @Prop()
  @Field(() => Boolean)
  bhyt: boolean

  /* @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Thuoc' }] })
  @Field(() => [Thuoc])
  thuocs: Thuoc[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'LoaiCanLamSang' }] })
  @Field(() => [LoaiCanLamSang])
  canlamsangs: LoaiCanLamSang[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Dichvu' }] })
  @Field(() => [Dichvu])
  dichvus: Dichvu[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Vattuyte' }] })
  @Field(() => [Vattuyte])
  vattuyte: Vattuyte[]; */
  @Prop()
  @Field(() => [DichVu])
  thuocs: DichVu[]

  @Prop()
  @Field(() => [DichVu])
  canlamsangs: DichVu[];

  @Prop()
  @Field(() => [DichVu])
  vattuyte: DichVu[];

  @Prop()
  @Field(() => Float)
  thanhtien: number

  @Prop({ default: false })
  @Field(() => Boolean, { defaultValue: false }) 
  trangthai: boolean;

  @Prop()
  @Field(() => Date)
  ngaytao: Date
}

export const HoadonSchema = SchemaFactory.createForClass(Hoadon);