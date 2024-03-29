import { DichVuInput } from 'src/types/dichvu.types';
import { CreateHoadonInput } from './create-hoadon.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHoadonInput extends PartialType(CreateHoadonInput) {
  @Field(() => String)
  id: string;

  @Field(() => [DichVuInput])
  thuocs: DichVuInput[]

  /* @Field(() => [DichVuInput])
  canlamsangs: DichVuInput[];  */

  @Field(() => [DichVuInput])
  vattuyte: DichVuInput[];
}
