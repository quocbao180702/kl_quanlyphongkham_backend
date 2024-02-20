import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { NewThuocInput } from "./new-thuoc.input";


@InputType()
export class UpdateThuocInput extends PartialType(NewThuocInput){

    @Field()
    id: string;
}