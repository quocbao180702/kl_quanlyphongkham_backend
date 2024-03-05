import { Field, InputType } from "@nestjs/graphql";
import mongoose from "mongoose";
import { ChuyenKhoa } from "src/chuyenkhoa/entities/chuyenkhoa.entity";
import { Phong } from "src/phong/entities/phong.entity";
import { Users } from "src/users/schemas/user.schema";

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
    cccd: string;

    @Field()
    ngayBD: Date;

    @Field(() => String)
    user: string

    @Field(() => [String])
    phongs: string[];

    @Field(() => String)
    chuyenkhoa: string;
}