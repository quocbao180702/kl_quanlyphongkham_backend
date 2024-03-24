import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateHoadonInput {
  @Field(() => String)
  benhnhan: string;

  @Field(() => Boolean)
  bhyt: boolean

  @Field(() => Date)
  ngaytao: Date
}
