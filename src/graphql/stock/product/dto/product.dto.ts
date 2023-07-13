import { InputType, Field } from "@nestjs/graphql"
import { IsNotEmpty, IsOptional } from "class-validator"

@InputType()
export class ProductInputDto {
  @IsNotEmpty()
  @Field(() => String)
  key: string

  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  value: string

  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  enabled: boolean
}
