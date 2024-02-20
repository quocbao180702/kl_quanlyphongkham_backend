import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePhieuchidinhcanlamsangInput {
  @Field(() => String)
  benhnhan: string;

  @Field(() => String)
  bacsi: string;

  @Field(() => String)
  loaicanlamsang: string;

  @Field(() => Boolean)
  bhyt: boolean

  @Field()
  hinhanh: string

  @Field()
  ketluan: string;

  @Field()
  thietbi: string
}
