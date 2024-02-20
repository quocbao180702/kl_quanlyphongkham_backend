import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { NewLoaiCanLamSangInput } from './new-loaicanlamsang.input';

@InputType()
export class UpdateLoaicanlamsangInput extends PartialType(NewLoaiCanLamSangInput) {
  @Field()
  id: string;
}
