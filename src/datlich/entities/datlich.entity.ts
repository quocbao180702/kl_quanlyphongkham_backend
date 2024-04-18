import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Schema as MongooSchema } from "mongoose";
import { BenhNhan } from "src/benhnhan/entities/benhnhan.entity";
import { TrangThaiDatKham } from "src/types/trangthai-datkham-types";


export type DatLichDocument = HydratedDocument<DatLich>;

@Schema()
@ObjectType()
export class DatLich {


    @Field(() => ID)
    _id: mongoose.Types.ObjectId;

    @Prop({ type: MongooSchema.Types.ObjectId, ref: 'BenhNhan' })
    @Field(() => BenhNhan)
    benhnhan: BenhNhan;

    @Prop()
    @Field()
    motabenh: string;

    @Prop()
    @Field()
    ngaydat: Date;

    @Prop()
    @Field()
    ngaykham: Date;

    /* @Prop()
    @Field()
    bhyt: Boolean; */

    @Field()
    @Prop()
    email: string;

    @Prop({ type: String, enum: TrangThaiDatKham, default: TrangThaiDatKham.DANGXET})
    @Field(type => TrangThaiDatKham)
    trangthai: TrangThaiDatKham

}

export const DatLichSchema = SchemaFactory.createForClass(DatLich);