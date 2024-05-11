import { LinkImageInput } from 'src/types/LinkImage.input';
import { CreateKetquacanlamsangInput } from './create-ketquacanlamsang.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateKetquacanlamsangInput extends PartialType(CreateKetquacanlamsangInput) {
  @Field()
  id: string;

  @Field(() => [LinkImageInput])
  hinhanh: LinkImageInput[]

  @Field()
  ketluan: string;

  @Field()
  thietbi: string
}
