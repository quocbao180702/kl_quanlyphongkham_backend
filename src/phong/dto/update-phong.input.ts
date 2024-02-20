import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { NewPhongInput } from "./new-phong.input";
import { Schema as MongooseSchema } from "mongoose";

@InputType()
export class UpdatePhongInput extends PartialType(NewPhongInput) {
    @Field(() => String)
    id: string;
}