import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Schema as MongooSchema } from 'mongoose';
import { BenhNhan } from 'src/benhnhan/schemas/benhnhan.schema';
import { Phong } from 'src/phong/schemas/phong.schema';

export type PhieuXacNhanDocument = HydratedDocument<PhieuXacNhan>;

@ObjectType()
@Schema()
export class PhieuXacNhan {

  @Field(() => ID)
    _id: mongoose.Types.ObjectId;

  @Prop({ type: MongooSchema.Types.ObjectId, ref: 'BenhNhan' })
  @Field(() => BenhNhan)
  benhnhans: BenhNhan;

  @Prop({ type: [{ type: MongooSchema.Types.ObjectId, ref: 'Phong', required: true }] })
  @Field(() => [Phong])
  phongs: Phong[];


  @Prop()
  @Field(() => Int)
  sothutu: number;

  @Prop()
  @Field(() => Date)
  ngaytao: Date;
}

export const PhieuXacNhanSchema = SchemaFactory.createForClass(PhieuXacNhan);
