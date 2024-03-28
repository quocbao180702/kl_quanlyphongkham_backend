import { Field, Float, InputType, Int } from "@nestjs/graphql";


@InputType()
export class NewThuocInput{

    @Field()
    tenthuoc: string;

    @Field()
	tenPhoBien: string;

    @Field()
	dangthuoc: string;

    @Field()
	donvi: string;

    @Field(() => Float)
    hamluong: number

    @Field(() => Float)
	giaBHYT: number;

    @Field(() => Float)
    giaKhongBHYT: number;

    @Field()
	bhyt: Boolean;

    @Field()
	nhasanxuat: string;

    @Field()
	hansudung: string;

    @Field(() => Int)
	soluong: number;


}