import { ObjectType, Field, Int, Float, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Schema as MongooSchemas } from 'mongoose';
import { BenhNhan } from 'src/benhnhan/schemas/benhnhan.schema';

export type SinhhieuDocument = HydratedDocument<Sinhhieu>;

@Schema()
@ObjectType()
export class Sinhhieu {

  @Field(() => ID)
    _id: mongoose.Types.ObjectId;

  @Prop({ type: MongooSchemas.Types.ObjectId, ref: 'BenhNhan' })
  @Field(() => BenhNhan)
  benhnhan: BenhNhan;

  @Prop()
  @Field(() => Float)
  mach: number;

  @Prop()
  @Field(() => Float)
  nhietdo: number;

  @Prop()
  @Field()
  ha: String;

  @Prop()
  @Field(() => Float)
  chieucao: number;

  @Prop()
  @Field(() => Float)
  cannang: number;

  @Prop()
  @Field(() => Float)
  bmi: number;

  @Prop()
  @Field(() => Boolean)
  benhmangtinh: boolean

}

export const SinhhieuSchema = SchemaFactory.createForClass(Sinhhieu);