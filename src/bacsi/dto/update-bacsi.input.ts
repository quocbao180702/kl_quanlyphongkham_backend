import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateBacSiInput{

    @Field()
    hoten: string;

    @Field()
	ngaysinh: Date;

    @Field()
	gioitinh: boolean;

    @Field()
	diachi: string;

    @Field()
	sdt: string;

    @Field()
	cccd: string;

    @Field()
	phong: string;

    @Field()
	ngayBD: Date;
    
    @Field()
	chuyenkhoaId: string;
}