import { Field, InputType, PartialType, extend } from "@nestjs/graphql";
import { NewDatLichBacSiInput } from "./new-datlichBacSi.input";

@InputType()
export class UpdateDatLichBacSiInput extends PartialType(NewDatLichBacSiInput){
    @Field()
    id: string;
}