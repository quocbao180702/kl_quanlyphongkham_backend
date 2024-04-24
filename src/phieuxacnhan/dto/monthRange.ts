import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MonthRange {
  @Field()
  month: number;

  @Field()
  count: number;
}