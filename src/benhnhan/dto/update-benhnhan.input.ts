import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { NewBenhNhanInput } from "./new-benhnhan.input";
import { Schema as MongooseSchema } from "mongoose";

@InputType()
export class UpdateBenhNhanInput extends PartialType(NewBenhNhanInput){
    @Field(() => ID)
    _id: string;

}