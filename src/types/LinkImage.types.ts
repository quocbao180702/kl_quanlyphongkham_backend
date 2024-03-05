import { Field, ObjectType } from "@nestjs/graphql";
import { TypeImage } from "./Users.types";
import { Prop, Schema } from "@nestjs/mongoose";

@ObjectType()
export class LinkImage{
    @Field()
    url: string;

    @Field()
    fileName: string
    
    @Field(type => TypeImage)
    type: TypeImage
}