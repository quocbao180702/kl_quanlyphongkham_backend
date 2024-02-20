import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateHoadonInput {
  @Field(() => String)
  benhnhan: string;

  @Field(() => [String])
  thuocs: string[];


  @Field(() => [String])
  canlamsangs: string[];

  @Field(() => [String])
  dichvus: string[];


  @Field(() => Float)
  thanhtien: number

  @Field(() => Date)
  ngaytao: Date
}
