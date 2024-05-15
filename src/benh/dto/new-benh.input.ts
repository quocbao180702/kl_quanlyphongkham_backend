import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class NewBenhInput{

    @Field()
    maICD: string;

    @Field(() => String)
    chuongbenh: string;

    @Field()
    tenbenh: string;

    @Field()
    motabenh: string;

}