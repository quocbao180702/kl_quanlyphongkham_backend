import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { LinkImageInput } from "./LinkImage.input";


@InputType()
export class KetQuaCanLamSangInput {
    @Field(() => String)
    loaicanlamsang: string;

    @Field(type => LinkImageInput)
    hinhanh: LinkImageInput

    @Field()
    ketluan: string;

    @Field()
    thietbi: string
}