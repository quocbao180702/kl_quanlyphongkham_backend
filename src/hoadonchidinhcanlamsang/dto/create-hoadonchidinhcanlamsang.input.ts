import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { DichVuInput } from 'src/types/dichvu.types';

@InputType()
export class CreateHoadonchidinhcanlamsangInput {

  @Field(() => String)
  benhnhan: string;

  @Field(()=> String)
  idPhieuCLS: string

  @Field(() => Boolean)
  bhyt: boolean

  @Field(() => [DichVuInput])
  chitietcanlamsang: DichVuInput[]

}
