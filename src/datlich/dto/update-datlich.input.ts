import { Field, InputType, PartialType, extend } from "@nestjs/graphql";
import { NewDatLichInput } from "./new-datlich.input";

@InputType()
export class UpdateDatLichInput extends PartialType(NewDatLichInput){
    @Field()
    id: string;
}