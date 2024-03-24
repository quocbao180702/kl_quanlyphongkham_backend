import { InputType, Int, Field } from '@nestjs/graphql';
import { ChiPhiInput } from 'src/types/chiphi.types';

@InputType()
export class CreateVattuyteInput {
  @Field()
  tenvattu: string;

  @Field(() => [ChiPhiInput])
  chiphi: ChiPhiInput[]

  @Field(() => Int)
  soluong: number;

  @Field()
  dvt: string;
}
