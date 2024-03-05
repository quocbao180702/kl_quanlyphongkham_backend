import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Schema as MongooSchemas } from 'mongoose';
import { BacSi } from 'src/bacsi/entities/bacsi.entity';
import { BenhNhan } from 'src/benhnhan/entities/benhnhan.entity';
import { LoaiCanLamSang } from 'src/loaicanlamsang/schemas/loaicanlamsang.entity';


export type PhieuchidinhcanlamsangDocument = HydratedDocument<Phieuchidinhcanlamsang>;
@Schema()
@ObjectType()
export class Phieuchidinhcanlamsang {

  @Field(() => ID)
    _id: mongoose.Types.ObjectId;

  @Prop({ type: MongooSchemas.Types.ObjectId, ref: 'BenhNhan' })
  @Field(() => BenhNhan)
  benhnhan: BenhNhan;

  @Prop({ type: MongooSchemas.Types.ObjectId, ref: 'BacSi' })
  @Field(() => BacSi)
  bacsi: BacSi;

  @Prop({ type: MongooSchemas.Types.ObjectId, ref: 'LoaiCanLamSang' })
  @Field(() => LoaiCanLamSang)
  loaicanlamsang: LoaiCanLamSang;

  @Prop()
  @Field(() => Boolean)
  bhyt: boolean

  @Prop()
  @Field()
  hinhanh: string

  @Prop()
  @Field()
  ketluan: string;

  @Prop()
  @Field()
  thietbi: string

}

export const PhieuchidinhcanlamsangSchema = SchemaFactory.createForClass(Phieuchidinhcanlamsang);
