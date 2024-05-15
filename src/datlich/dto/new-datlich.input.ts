import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class NewDatLichInput{

    @Field()
    hoten: string;

    @Field()
    sodienthoai: string;

    @Field()
    cccd: string;

    @Field()
    ngaysinh: Date;

    @Field()
    gioitinh: boolean;

    @Field()
    motabenh: string;

    @Field()
    ngaydat: Date;

    @Field()
    ngaykham: Date;

    @Field()
    email: string;
}