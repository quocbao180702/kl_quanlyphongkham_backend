import { ObjectType, Field, Int, Float, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BenhNhan } from 'src/benhnhan/entities/benhnhan.entity';
import { DichVu } from 'src/types/dichvu.types';


export type HoaDonChiDinhCanLamSangDocument = HydratedDocument<Hoadonchidinhcanlamsang>;

@ObjectType()
@Schema()
export class Hoadonchidinhcanlamsang {

  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'BenhNhan' })
  @Field(() => BenhNhan)
  benhnhan: BenhNhan;

  @Prop()
  @Field(() => String, {nullable: true})
  idPhieuCLS: string

  @Prop()
  @Field(() => Boolean)
  bhyt: boolean

  @Prop()
  @Field(() => [DichVu])
  chitietcanlamsang: DichVu[]

  @Prop({ default: false })
  @Field(() => Boolean)
  tinhtrang: boolean

  @Field(() => Float)
  @Prop()
  thanhtien: number

  @Field()
  @Prop({default: Date.now()})
  ngaytao: Date
}

export const HoadonChiDinhCanLamSangSchema = SchemaFactory.createForClass(Hoadonchidinhcanlamsang)
