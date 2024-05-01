import { Field, InputType } from "@nestjs/graphql";
import { PhienInput } from "src/types/phiens.input";

@InputType()
export class NewDatLichBacSiInput{


    @Field()
    bacsi: string

    @Field()
    hoten: string;

    @Field()
    sodienthoai: string;

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


}