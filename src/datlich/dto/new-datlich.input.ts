import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class NewDatLichInput{

    @Field()
    benhnhans: string;

    @Field()
    motabenh: string;

    @Field()
    ngaydat: Date;

    @Field()
    ngaykham: Date;
    
    @Field()
    bhyt: Boolean;
}