import { InputType, Field, Int } from '@nestjs/graphql';
@InputType()
export class CreatePhieuXacNhanInput {
  @Field(() => String)
  benhnhans:  string;

  @Field(() => [String])
  phongs: string[];

  @Field(() => Int)
  sothutu: number;

  @Field(() => Date)
  ngaytao: Date;
}