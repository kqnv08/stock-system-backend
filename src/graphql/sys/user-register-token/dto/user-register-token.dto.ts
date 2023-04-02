import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsOptional } from "class-validator"

@InputType()
export class UserRegisterTokenInputDto {

  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  email: string

  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  token: string

  @IsNotEmpty()
  @Field(() => Date, { nullable: false })
  expirationDate: Date

}
