import { InputType, Field, Int, PartialType, ID } from "@nestjs/graphql"
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

@InputType()
export class UserInputDto {
  @IsOptional()
  @Field(() => String, { nullable: true })
  firstName?: string

  @IsOptional()
  @Field(() => String, { nullable: true })
  lastName?: string

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String, { nullable: false })
  email: string

  @IsOptional()
  @Field(() => String, { nullable: true })
  password?: string

  @IsNotEmpty()
  @Field(() => ID, { nullable: false })
  roleId: number

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  active: boolean

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  enabled?: boolean
}
@InputType()
export class UserChangePasswordDto {

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false })
  oldPassword: string

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Field(() => String, { nullable: false })
  newPassword: string

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Field(() => String, { nullable: false })
  repeatNewPassword: string
}

@InputType()
export class AdminChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false })
  password: string

  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  userId: number
}

@InputType()
export class ConfirmationCodeInputDto {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String, { nullable: false })
  email: string

}

@InputType()
export class VerifyRegisterTokenInputDto extends PartialType(ConfirmationCodeInputDto) {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false })
  token: string
}
@InputType()
export class CreateByCodeDto {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String, { nullable: false })
  email: string

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false })
  code: string

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false })
  password: string
}
