import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Schema as MongooSchemas } from 'mongoose';
import { BacSi } from 'src/bacsi/entities/bacsi.entity';
import { BenhNhan } from 'src/benhnhan/entities/benhnhan.entity';
import { KetQuaCanLamSang } from 'src/ketquacanlamsang/entities/ketquacanlamsang.entity';
import { PhieuXacNhan } from 'src/phieuxacnhan/entities/phieuxacnhan.entity';
import { TrangThaiCLS } from '../dto/trangthaiCLS';


export type PhieuchidinhcanlamsangDocument = HydratedDocument<Phieuchidinhcanlamsang>;
@Schema()
@ObjectType()
export class Phieuchidinhcanlamsang {

  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'BenhNhan' })
  @Field(() => BenhNhan)
  benhnhan: BenhNhan;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'BacSi' })
  @Field(() => BacSi)
  bacsi: BacSi;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PhieuXacNhan' })
  @Field(() => PhieuXacNhan)
  phieuxacnhan: PhieuXacNhan

  @Prop()
  @Field(() => Boolean)
  bhyt: boolean

  @Prop()
  @Field(() => Boolean)
  truoc: boolean

  @Prop()
  @Field()
  ngaytao: Date;

  @Prop({type: String,  enum: TrangThaiCLS, default: TrangThaiCLS.THANHTOAN })
  @Field(type => TrangThaiCLS)
  trangthai: TrangThaiCLS

  @Field(() => [KetQuaCanLamSang])
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'KetQuaCanLamSang' }], required: true })
  ketquacanlamsangs: KetQuaCanLamSang[];
}


export const PhieuchidinhcanlamsangSchema = SchemaFactory.createForClass(Phieuchidinhcanlamsang);
