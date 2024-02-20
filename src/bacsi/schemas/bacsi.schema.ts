import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Schema as MongooSchema } from "mongoose";
import { Phieuchidinhcanlamsang } from "src/phieuchidinhcanlamsang/entities/phieuchidinhcanlamsang.entity";
import { Toathuoc } from "src/toathuoc/entities/toathuoc.entity";


export type BacSiDocument = HydratedDocument<BacSi>;

@Schema()
@ObjectType()
export class BacSi {

    @Field(() => ID)
    _id: mongoose.Types.ObjectId;


    @Field()
    @Prop()
    hoten: string;

    @Field()
    @Prop()
    ngaysinh: Date;

    @Field()
    @Prop()
    gioitinh: boolean;

    @Field()
    @Prop()
    diachi: string;

    @Field()
    @Prop()
    sdt: string;

    @Field()
    @Prop()
    cccd: string;

    @Field()
    @Prop()
    phong: string;

    @Field()
    @Prop()
    ngayBD: Date;

    @Field()
    @Prop()
    chuyenkhoaId: string;

    @Field(() => [Toathuoc])
    @Prop({ type: [{ type: MongooSchema.Types.ObjectId, ref: 'Toathuoc' }] })
    toathuocs: Toathuoc[];

    @Field(() => [Phieuchidinhcanlamsang])
    @Prop({ type: [{ type: MongooSchema.Types.ObjectId, ref: 'Phieuchidinhcanlamsang' }] })
    phieuchidinhcanlamsangs: Phieuchidinhcanlamsang[];

}

export const BacSiSchema = SchemaFactory.createForClass(BacSi);