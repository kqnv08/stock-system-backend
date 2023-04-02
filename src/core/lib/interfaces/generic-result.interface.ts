import { Field, ObjectType } from "@nestjs/graphql"
import { IsOptional } from "class-validator"

@ObjectType()
export class GenericResult {

  @Field(() => Boolean)
  success: boolean

  @IsOptional()
  @Field(() => String, { nullable: true })
  successData?: string

  @Field(() => String, { nullable: true })
  @IsOptional()
  error?: string
}
