import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { BenhNhan } from 'src/benhnhan/entities/benhnhan.entity';


export type SobenhDocument = HydratedDocument<Sobenh>;

@Schema()
@ObjectType()
export class Sobenh {

  @Field(() => ID)
    _id: mongoose.Types.ObjectId;


  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'BenhNhan' })
  @Field(() => BenhNhan)
  benhnhan: BenhNhan;

  @Prop()
  @Field(() => Date)
  ngaytao: Date
}

export const SobenhSchema = SchemaFactory.createForClass(Sobenh);
