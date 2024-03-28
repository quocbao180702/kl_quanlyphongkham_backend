import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Phong } from "src/phong/entities/phong.entity";
import { Users } from "src/users/entities/user.entity";


export type NhanVienDocument = HydratedDocument<NhanVien>;

@Schema()
@ObjectType()
export class NhanVien {

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

    @Field()
    @Prop()
    sodienthoai: string

    @Prop()
    @Field()
    cccd: string;

    @Field(() => [Phong])
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Phong', required: true }])
    phongs: Phong[];

    @Prop()
    @Field()
    ngayBD: Date;

    @Prop()
    @Field()
    chucvu: string;

    @Field(type => Users)
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true })
    user: Users;

}

export const NhanVienSchema = SchemaFactory.createForClass(NhanVien);