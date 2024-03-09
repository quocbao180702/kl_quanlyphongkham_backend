import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Schema as MongooSchemas } from "mongoose";
import { Toathuoc } from "src/toathuoc/entities/toathuoc.entity";


export type BenhDocument = HydratedDocument<Benh>;

@ObjectType()
@Schema()
export class Benh {

    @Field(() => ID)
    _id: mongoose.Types.ObjectId;

    @Field()
    @Prop()
    maICD: string;

    @Field(() => String)
    @Prop()
    chuongbenh: string;

    @Field()
    @Prop()
    tenbenh: string;

    @Field()
    @Prop()
    motabenh: string;

    /* @Field(() => [Toathuoc])
    @Prop({ type: [{ type: MongooSchemas.Types.ObjectId, ref: 'Toathuoc', require: true }] })
    toathuocs: Toathuoc[]; */
}

export const BenhSchema = SchemaFactory.createForClass(Benh);