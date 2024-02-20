import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class NewLoaiCanLamSangInput{

    @Field()
	tenxetnghiem: string;

    @Field(() => Float)
	gia: number;

    @Field()
	mota: string;

}