import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { NewBenhInput } from "./new-benh.input";

@InputType()
export class UpdateBenhInput extends PartialType(NewBenhInput){

   @Field()
   id: string

}