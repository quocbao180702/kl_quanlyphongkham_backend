import { Field, InputType, PartialType, extend } from "@nestjs/graphql";
import { NewChuyenKhoaInput } from "./new-chuyenkhoa.input";

@InputType()
export class UpdateChuyenKhoaInput extends PartialType(NewChuyenKhoaInput){

    @Field()
    id: string;
    
}