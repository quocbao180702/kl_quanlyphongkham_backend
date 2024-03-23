import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Schema as MongooseSchema, SchemaTypes, Types } from "mongoose";
import { Hoadon } from "src/hoadon/entities/hoadon.entity";
import { Phieuchidinhcanlamsang } from "src/phieuchidinhcanlamsang/entities/phieuchidinhcanlamsang.entity";
import { Sinhhieu } from "src/sinhhieu/entities/sinhhieu.entity";
import { Sobenh } from "src/sobenh/entities/sobenh.entity";
import { Toathuoc } from "src/toathuoc/entities/toathuoc.entity";
import { Users } from "src/users/entities/user.entity";


export type BenhNhanDocument = HydratedDocument<BenhNhan>;
@Schema()
@ObjectType()
export class BenhNhan {
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
    cccd: string;

    @Prop()
    @Field()
    bhyt: string;

    @Field(() => Users)
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true })
    user: Users;

    @Field(() => Sinhhieu, { nullable: true })
    sinhhieu: Sinhhieu;


    /* @Field(() => [PhieuXacNhan])
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'PhieuXacNhan' }] })
    phieuxacnhans: PhieuXacNhan[];

    @Field(() => [Toathuoc])
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Toathuoc' }] })
    toathuocs: Toathuoc[];

    @Field(() => [Hoadon])
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Hoadon' }] })
    hoadons: Hoadon[];

    @Field(() => Sobenh)
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Sobenh' }] })
    sobenhs: Sobenh;

    @Field(() => Sinhhieu)
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Sinhhieu' }] })
    sinhieu: Sinhhieu;

    @Field(() => [Phieuchidinhcanlamsang])
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Phieuchidinhcanlamsang' }] })
    phieuchidinhcanlamsangs: Phieuchidinhcanlamsang[]; */


}

export const BenhNhanSchema = SchemaFactory.createForClass(BenhNhan);