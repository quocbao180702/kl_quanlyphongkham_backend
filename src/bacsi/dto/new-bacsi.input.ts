import { Field, ID, InputType } from "@nestjs/graphql";
import mongoose from "mongoose";
import { ChuyenKhoa } from "src/chuyenkhoa/entities/chuyenkhoa.entity";
import { Phong } from "src/phong/entities/phong.entity";
import { Users } from "src/users/entities/user.entity";

@InputType()
export class NewBacSiInput {

    @Field()
    hoten: string;

    @Field()
    ngaysinh: Date;

    @Field()
    gioitinh: boolean;

    @Field()
    diachi: string;

    @Field()
    sodienthoai: string


    @Field()
    cccd: string;

    @Field()
    ngayBD: Date;

    @Field(() => String)
    username: string

    @Field(() => [ID])
    phongs: string[];

    @Field(() => ID)
    chuyenkhoa: string;
}