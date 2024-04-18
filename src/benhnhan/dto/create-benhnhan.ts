import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateBenhNhan {
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
}