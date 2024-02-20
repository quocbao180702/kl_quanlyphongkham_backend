import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";


export type NhanVienDocument = HydratedDocument<NhanVien>;

@Schema()
@ObjectType()
export class NhanVien{

    @Field(() => ID)
    _id: mongoose.Types.ObjectId;

    @Prop()
    @Field()
	hoten: string;

    @Prop()
    @Field()
	ngaysinh: Date;

    @Prop()
    @Field()
	gioitinh: boolean;

    @Prop()
    @Field()
	diachi: string;

    @Prop()
    @Field()
	sdt: string;

    @Prop()
    @Field()
	cccd: string;

    @Prop()
    @Field()
	phong: string;

    @Prop()
    @Field()
	ngayBD: Date;
}

export const NhanVienSchema = SchemaFactory.createForClass(NhanVien);