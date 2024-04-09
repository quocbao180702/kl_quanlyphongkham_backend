import { InputType, Field, ID } from '@nestjs/graphql';
import { LinkImageInput } from 'src/types/LinkImage.input';

@InputType()
export class CreateBlogInput {

  @Field()
  user: string;

  @Field(type => LinkImageInput)
  hinhanh: LinkImageInput

  @Field()
  tieude: string;
  
  @Field()
  tomtat: string;

  @Field()
  noidung: string;

}