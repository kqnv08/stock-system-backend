import { InputType, Field, Float } from "@nestjs/graphql"
import { IsNotEmpty, IsOptional } from "class-validator"

@InputType()
export class ProductInputDto {

  @Field(() => String, { nullable: true })
  name?: string


  @Field(() => String, { nullable: true })
  code?: string


  @Field(() => Float, { nullable: true })
  price?: number
}
