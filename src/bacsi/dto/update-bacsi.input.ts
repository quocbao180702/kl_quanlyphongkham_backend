import { Field, InputType, PartialType } from "@nestjs/graphql";
import { NewBacSiInput } from "./new-bacsi.input";

@InputType()
export class UpdateBacSiInput extends PartialType(NewBacSiInput){

    @Field()
    id: string;
    
}