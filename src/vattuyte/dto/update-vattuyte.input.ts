import { CreateVattuyteInput } from './create-vattuyte.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVattuyteInput extends PartialType(CreateVattuyteInput) {
  @Field()
  id: string;
}
