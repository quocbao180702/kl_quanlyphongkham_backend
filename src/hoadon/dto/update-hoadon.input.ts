import { CreateHoadonInput } from './create-hoadon.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHoadonInput extends PartialType(CreateHoadonInput) {
  @Field(() => String)
  id: string;
}
