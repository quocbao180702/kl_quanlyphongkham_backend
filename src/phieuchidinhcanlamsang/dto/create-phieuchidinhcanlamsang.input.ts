import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePhieuchidinhcanlamsangInput {
  @Field(() => String)
  benhnhan: string;

  @Field(() => String)
  bacsi: string;
  
  @Field(() => Boolean)
  bhyt: boolean

  @Field()
  ngaytao: Date;
}
