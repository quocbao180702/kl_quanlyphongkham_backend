import { CreateToathuocInput } from './create-toathuoc.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateToathuocInput extends PartialType(CreateToathuocInput) {
  @Field(() => String)
  id: string;
}
