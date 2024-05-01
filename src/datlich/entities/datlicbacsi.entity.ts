import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Schema as MongooSchema } from "mongoose";
import { BacSi } from "src/bacsi/entities/bacsi.entity";
import { BenhNhan } from "src/benhnhan/entities/benhnhan.entity";
import { Phiens } from "src/types/phiens";
import { TrangThaiDatKham } from "src/types/trangthai-datkham-types";



export type DatLichBacSiDocument = HydratedDocument<DatLichBacSi>;

@ObjectType()
@Schema()
export class DatLichBacSi {

    @Field(() => ID)
    _id: mongoose.Types.ObjectId;

    @Prop({ type: MongooSchema.Types.ObjectId, ref: 'BacSi' })
    @Field(() => BacSi)
    bacsi: BacSi;

    @Prop({ type: MongooSchema.Types.ObjectId, ref: 'BenhNhan' })
    @Field(() => BenhNhan)
    benhnhan: BenhNhan;

    @Prop()
    @Field()
    motabenh: string;

    @Prop({ type: Phiens })
    @Field(() => Phiens)
    phien: Phiens

    @Prop()
    @Field()
    ngaydat: Date;

    @Prop()
    @Field()
    ngaykham: Date;

    @Field()
    @Prop()
    email: string;

    @Prop({ type: String, enum: TrangThaiDatKham, default: TrangThaiDatKham.DANGXET })
    @Field(type => TrangThaiDatKham)
    trangthai: TrangThaiDatKham
}


export const DatLichBacSiSchema = SchemaFactory.createForClass(DatLichBacSi);