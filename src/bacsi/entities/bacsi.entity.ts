import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Schema as MongooSchema } from "mongoose";
import { ChuyenKhoa } from "src/chuyenkhoa/entities/chuyenkhoa.entity";
import { Lichkham } from "src/lichkham/entities/lichkham.entity";
import { Phieuchidinhcanlamsang } from "src/phieuchidinhcanlamsang/entities/phieuchidinhcanlamsang.entity";
import { Phong } from "src/phong/entities/phong.entity";
import { Toathuoc } from "src/toathuoc/entities/toathuoc.entity";
import { Users } from "src/users/entities/user.entity";


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
    sodienthoai: string

    @Field()
    @Prop()
    cccd: string;

    @Field()
    @Prop()
    ngayBD: Date;

    @Field(() => Users)
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users', default: null })
    user?: Users | null;

    @Field(() => [Phong])
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Phong', required: true }])
    phongs: Phong[];

    @Field(() => ChuyenKhoa)
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ChuyenKhoa', required: true })
    chuyenkhoa: ChuyenKhoa;

    @Field(() => String, {nullable: true})
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Lichkham', default: "" })
    lichkham: string
}

export const BacSiSchema = SchemaFactory.createForClass(BacSi);