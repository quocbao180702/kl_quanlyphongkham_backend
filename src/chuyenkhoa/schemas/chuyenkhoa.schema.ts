import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";



export type ChuyenKhoaDocument = HydratedDocument<ChuyenKhoa>; 

@Schema()
@ObjectType()
export class ChuyenKhoa{

    @Field(() => ID)
    _id: mongoose.Types.ObjectId;

    @Prop()
    @Field()
    tenkhoa: string

    @Prop()
    @Field()
    mota: string;
}

export const ChuyenKhoaSchema = SchemaFactory.createForClass(ChuyenKhoa);