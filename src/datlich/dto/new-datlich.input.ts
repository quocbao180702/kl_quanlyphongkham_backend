import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class NewDatLichInput{

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
    
    /* @Field()
    bhyt: Boolean; */
}