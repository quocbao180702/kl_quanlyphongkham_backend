import { Field, InputType } from "@nestjs/graphql";
import { PhienInput } from "src/types/phiens.input";
import { TrangThaiDatKham } from "src/types/trangthai-datkham-types";

@InputType()
export class NewDatLichBacSiInput{


    @Field()
    bacsi: string

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

    @Field(() => PhienInput)
    phien: PhienInput;

    @Field(() => String, {nullable: true})
    trangthai: string

}