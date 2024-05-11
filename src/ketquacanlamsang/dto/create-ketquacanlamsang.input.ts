import { InputType, Int, Field } from '@nestjs/graphql';
import { LoaiCanLamSang } from 'src/loaicanlamsang/entities/loaicanlamsang.entity';
import { LinkImageInput } from 'src/types/LinkImage.input';
import { LinkImage } from 'src/types/LinkImage.types';

@InputType()
export class CreateKetquacanlamsangInput {
  @Field(() => String)
  loaicanlamsang: string;

}
