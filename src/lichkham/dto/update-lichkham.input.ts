import { CreateLichkhamInput } from './create-lichkham.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLichkhamInput extends PartialType(CreateLichkhamInput) {
  @Field(() => String)
  id: string;
}
