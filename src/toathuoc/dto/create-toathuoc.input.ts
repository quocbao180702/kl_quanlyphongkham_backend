import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateToathuocInput {
  @Field(() => String)
  benhnhan: string;

  @Field(() => String)
  bacsi: string;

  @Field(() => [String])
  thuocs: string[];

  @Field(() => [Int])
  soluongs: number[];

  @Field(() => [String])
  benhs: string[];

  @Field()
  bhyt: Boolean;

  @Field()
  ngaytaikham: Date;

  @Field()
  ngaytao: Date;
}
