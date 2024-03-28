import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class NewBenhNhanInput {

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
    bhyt: string;

    @Field(() => String)
    username: string;
}