import { InputType, Int, Field } from '@nestjs/graphql';
import { KetQuaCanLamSangInput } from 'src/types/ketquacanlamsan.input';

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
