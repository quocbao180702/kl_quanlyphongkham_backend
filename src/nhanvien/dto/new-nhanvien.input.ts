import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class NewNhanVienInput {
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
    username: string

    @Field(() => [String])
    phongs: string[];

    @Field()
    ngayBD: Date;

    @Field()
    chucvu: string;
}