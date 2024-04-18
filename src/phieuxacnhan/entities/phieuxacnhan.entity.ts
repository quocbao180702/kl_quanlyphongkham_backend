import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Schema as MongooSchema } from 'mongoose';
import { BenhNhan } from 'src/benhnhan/entities/benhnhan.entity';
import { Phieuchidinhcanlamsang } from 'src/phieuchidinhcanlamsang/entities/phieuchidinhcanlamsang.entity';
import { Phong } from 'src/phong/entities/phong.entity';
import { TrangThaiKham } from 'src/types/trangthai-kham.types';

export type PhieuXacNhanDocument = HydratedDocument<PhieuXacNhan>;

@ObjectType()
@Schema()
export class PhieuXacNhan {

  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @Prop({ type: MongooSchema.Types.ObjectId, ref: 'BenhNhan', required: true })
  @Field(() => BenhNhan)
  benhnhan: BenhNhan;

  @Prop({ type: [{ type: MongooSchema.Types.ObjectId, ref: 'Phong', required: true }] })
  @Field(() => [Phong])
  phongs: Phong[];

  @Prop({type: String, enum: TrangThaiKham, default: TrangThaiKham.CHOKHAM })
  @Field(type => TrangThaiKham)
  trangthai: TrangThaiKham;

  @Prop()
  @Field(() => Int)
  sothutu: number;

  @Prop()
  @Field(() => Date)
  ngaykham: Date;

  @Prop()
  @Field(() => Date)
  ngaytao: Date;

  @Field(() => Phieuchidinhcanlamsang, { nullable: true })
  phieuchidinhcanlamsang: Phieuchidinhcanlamsang
}

export const PhieuXacNhanSchema = SchemaFactory.createForClass(PhieuXacNhan);
