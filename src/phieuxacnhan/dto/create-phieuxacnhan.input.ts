import { InputType, Field, Int } from '@nestjs/graphql';
@InputType()
export class CreatePhieuXacNhanInput {
  @Field(() => String)
  benhnhan:  string;

  @Field(() => [String])
  phongs: string[];

  @Field(() => Boolean) 
  trangthai: boolean

  @Field(() => Int)
  sothutu: number;

  @Field(() => Date)
  ngaykham: Date;

  @Field(() => Date)
  ngaytao: Date;
}