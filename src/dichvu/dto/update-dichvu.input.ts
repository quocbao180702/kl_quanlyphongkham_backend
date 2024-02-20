import { CreateDichvuInput } from './create-dichvu.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDichvuInput extends PartialType(CreateDichvuInput) {
  @Field(() => String)
  id: string;
}
