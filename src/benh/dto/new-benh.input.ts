import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class NewBenhInput{

    @Field()
    maICD: string;

    @Field(() => Int)
    chuongbenh: number;


    @Field()
    tenbenh: string;

    @Field()
    motabenh: string;

}