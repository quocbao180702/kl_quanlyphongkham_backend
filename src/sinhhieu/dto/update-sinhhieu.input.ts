import { CreateSinhhieuInput } from './create-sinhhieu.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSinhhieuInput extends PartialType(CreateSinhhieuInput) {
  @Field(() => Int)
  id: number;
}
