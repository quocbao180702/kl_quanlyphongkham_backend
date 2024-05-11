import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Promise } from 'mongoose';
import { LoaiCanLamSang } from 'src/loaicanlamsang/entities/loaicanlamsang.entity';
import { LinkImage } from 'src/types/LinkImage.types';


export type KetQuaCanLamSangDocument = HydratedDocument<KetQuaCanLamSang>;

@Schema()
@ObjectType()
export class KetQuaCanLamSang {

    @Field(() => ID)
    _id: mongoose.Types.ObjectId;

    @Field(() => LoaiCanLamSang)
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'LoaiCanLamSang', required: true })
    loaicanlamsang: LoaiCanLamSang;

    @Prop({type: [LinkImage]})
    @Field(() => [LinkImage], {nullable: true})
    hinhanh: LinkImage[]

    @Prop()
    @Field({ nullable: true })
    ketluan: string;

    @Prop()
    @Field({ nullable: true })
    thietbi: string
}


export const KetQuaCanLamSangSchema = SchemaFactory.createForClass(KetQuaCanLamSang);