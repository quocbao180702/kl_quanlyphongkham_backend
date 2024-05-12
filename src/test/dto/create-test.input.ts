import { InputType, Int, Field } from '@nestjs/graphql';
import { LinkImageInput } from 'src/types/LinkImage.input';

@InputType()
export class CreateTestInput {

  /* @Field(() => [LinkImageInput])
  listImages: LinkImageInput[] */

  @Field()
  name: string;

  @Field()
  age: string

  @Field()
  adress: string;
}
