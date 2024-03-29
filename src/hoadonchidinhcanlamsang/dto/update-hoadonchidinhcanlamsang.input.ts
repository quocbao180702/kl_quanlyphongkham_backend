import { CreateHoadonchidinhcanlamsangInput } from './create-hoadonchidinhcanlamsang.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHoadonchidinhcanlamsangInput extends PartialType(CreateHoadonchidinhcanlamsangInput) {
  @Field(() => String)
  id: string;
}
