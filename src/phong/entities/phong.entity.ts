import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Schema as MongooSchema } from "mongoose";
import { ChuyenKhoa } from "src/chuyenkhoa/entities/chuyenkhoa.entity";


export type PhongDocument = HydratedDocument<Phong>;

@Schema()
@ObjectType()
export class Phong {

    @Field(() => ID)
    _id: mongoose.Types.ObjectId;

    @Field()
    @Prop()
    tenphong: string;

    @Field()
    @Prop()
    mota: string;

    @Field(() => ChuyenKhoa, {nullable: true})
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ChuyenKhoa'})
    chuyenkhoa: ChuyenKhoa;

    /* @Field(() => [String])
    @Prop({ type: [{ type: MongooSchema.Types.ObjectId, ref: 'PhieuXacNhan', require: true }] })
    phieuxacnhan: string[]; */
}

export const PhongSchema = SchemaFactory.createForClass(Phong);