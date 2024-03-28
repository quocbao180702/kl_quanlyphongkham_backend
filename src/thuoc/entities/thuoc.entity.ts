import { Field, Float, ID, Int, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Schema as MongooSchemas } from "mongoose";


export type ThuoDocument = HydratedDocument<Thuoc>;


@ObjectType()
@Schema()
export class Thuoc {

    @Field(() => ID)
    _id: mongoose.Types.ObjectId;

    @Field()
    @Prop()
    tenthuoc: string;

    @Field()
    @Prop()
    tenPhoBien: string;

    @Field()
    @Prop()
    dangthuoc: string;

    @Field()
    @Prop()
    donvi: string;

    @Field(() => Float)
    @Prop()
    giaBHYT: number;

    @Field(() => Float)
    @Prop()
    giaKhongBHYT: number;

    @Field(() => Float)
    @Prop()
    hamluong: number

    @Field()
    @Prop()
    bhyt: Boolean;

    @Field()
    @Prop()
    nhasanxuat: string;

    @Field()
    @Prop()
    hansudung: string;

    @Field(() => Int)
    @Prop()
    soluong: number;
}

export const ThuocSchema = SchemaFactory.createForClass(Thuoc);