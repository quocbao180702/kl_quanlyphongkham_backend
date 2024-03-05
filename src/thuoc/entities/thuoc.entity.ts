import { Field, Float, ID, Int, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Schema as MongooSchemas } from "mongoose";
import { Hoadon } from "src/hoadon/entities/hoadon.entity";
import { Toathuoc } from "src/toathuoc/entities/toathuoc.entity";

export type ThuoDocument = HydratedDocument<Thuoc>;


@ObjectType()
@Schema()
export class Thuoc{

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
	gia: number;

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

   /*  @Field(() => [Toathuoc])
    @Prop({type: [{type: MongooSchemas.Types.ObjectId, ref: 'Toathuoc', require: true}] })
    toathuocs: Toathuoc[];

    @Field(() => [Hoadon])
    @Prop({type: [{type: MongooSchemas.Types.ObjectId, ref: 'Hoadon', require: true}] })
    hoadons: Hoadon[]; */
}

export const ThuocSchema = SchemaFactory.createForClass(Thuoc);