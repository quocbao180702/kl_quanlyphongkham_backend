import { InputType, Int, Field } from '@nestjs/graphql';
import { PhienkhamInput } from 'src/types/phienkham.input';

@InputType()
export class CreateLichkhamInput {

  @Field(() => [PhienkhamInput])
  ngaykham: PhienkhamInput[]

  @Field(() => [Date])
  ngaynghi: Date[]

}
