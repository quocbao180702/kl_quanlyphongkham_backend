import { CreatePhieuXacNhanInput } from './create-phieuxacnhan.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { Schema as MongooSchema } from 'mongoose';

@InputType()
export class UpdatePhieuXacNhanInput extends PartialType(CreatePhieuXacNhanInput) {
  @Field(() => String)
  id: string;
}
