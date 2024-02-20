import { CreatePhieuchidinhcanlamsangInput } from './create-phieuchidinhcanlamsang.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePhieuchidinhcanlamsangInput extends PartialType(CreatePhieuchidinhcanlamsangInput) {
  @Field(() => String)
  id: string;
}
