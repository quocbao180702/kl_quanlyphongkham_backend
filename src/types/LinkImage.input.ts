import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { TypeImage } from "./Users.types";
import { Prop, Schema } from "@nestjs/mongoose";

@InputType()
export class LinkImageInput{
    @Field()
    url: string;

    @Field()
    fileName: string
    
    @Field(type => TypeImage)
    type: TypeImage
}