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
    cccd: string;

    @Field(() => [String])
    phongs: string[];

    @Field()
    ngayBD: Date;

    @Field()
    chucvu: string;

    @Field(() => String)
    user: String;
}