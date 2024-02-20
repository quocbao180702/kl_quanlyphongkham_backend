import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateSinhhieuInput {
  @Field(() => String)
  benhnhan: string;

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
