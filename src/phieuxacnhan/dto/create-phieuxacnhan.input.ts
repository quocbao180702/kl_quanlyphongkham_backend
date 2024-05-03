import { InputType, Field, Int } from '@nestjs/graphql';
import { Phiens } from 'src/types/phiens';
import { PhienInput } from 'src/types/phiens.input';
@InputType()
export class CreatePhieuXacNhanInput {
  @Field(() => String)
  benhnhan: string;

  @Field(() => [String])
  phongs: string[];

  @Field(() => Date)
  ngaykham: Date;

  @Field(() => PhienInput)
  phien: PhienInput;

  @Field(() => Date)
  ngaytao: Date;

  @Field(() => String)
  email: string
}