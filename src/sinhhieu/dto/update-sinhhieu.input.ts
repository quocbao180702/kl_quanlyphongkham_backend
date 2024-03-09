import { CreateSinhhieuInput } from './create-sinhhieu.input';
import { InputType, Field, Int, PartialType, Float } from '@nestjs/graphql';

@InputType()
export class UpdateSinhhieuInput {
  @Field(() => String)
  id: string;

  @Field(() => Float)
  mach: number;

  @Field(() => Float)
  nhietdo: number;

  @Field()
  ha: String;

  @Field(() => Float)
  chieucao: number;

  @Field(() => Float)
  cannang: number;

  @Field(() => Float)
  bmi: number;

  @Field(() => Boolean)
  benhmangtinh: boolean
}
