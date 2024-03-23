import { Field, InputType, PartialType } from "@nestjs/graphql";
import { NewNhanVienInput } from "./new-nhanvien.input";

@InputType()
export class UpdateNhanVienInput extends PartialType(NewNhanVienInput) {
    @Field()
    id: string;
}