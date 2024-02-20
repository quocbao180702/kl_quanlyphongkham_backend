import { InputType, Int, Field } from '@nestjs/graphql';
import { BenhNhan } from 'src/benhnhan/schemas/benhnhan.schema';

@InputType()
export class CreateSobenhInput {
  @Field(() => String)
  benhnhan: string;

  @Field(() => Date)
  ngaytao: Date
}
