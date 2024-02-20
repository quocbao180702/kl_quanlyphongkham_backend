import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateDichvuInput {
  @Field()
  tendichvu: string;

  @Field(() => Float)
  gia: number;


  @Field(() => Boolean)
  bhyt: boolean;

  @Field(() => Int)
  soluong: number;

  @Field()
  dvt: string;
}
