import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Schema as MongooSchema } from "mongoose";
import { BenhNhan } from "src/benhnhan/entities/benhnhan.entity";


export type DatLichDocument = HydratedDocument<DatLich>;

@Schema()
@ObjectType()
export class DatLich {


    @Field(() => ID)
    _id: mongoose.Types.ObjectId;

    @Prop({ type: MongooSchema.Types.ObjectId, ref: 'BenhNhan' })
    @Field(() => BenhNhan)
    benhnhans: BenhNhan;

    @Prop()
    @Field()
    motabenh: string;

    @Prop()
    @Field()
    ngaydat: Date;

    @Prop()
    @Field()
    ngaykham: Date;

    @Prop()
    @Field()
    bhyt: Boolean;
}

export const DatLichSchema = SchemaFactory.createForClass(DatLich);