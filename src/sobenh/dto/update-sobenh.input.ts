import { CreateSobenhInput } from './create-sobenh.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSobenhInput extends PartialType(CreateSobenhInput) {
  @Field(() => String)
  id: string;
}
