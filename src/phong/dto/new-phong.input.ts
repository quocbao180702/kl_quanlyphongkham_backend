import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class NewPhongInput{
    @Field()
    tenphong: string;

    @Field()
	mota: string;

    @Field(() => String)
	chuyenkhoa: string;
}