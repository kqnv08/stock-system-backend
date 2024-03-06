import { InputType, Field, ID, Int, Float } from "@nestjs/graphql"
import { IsNotEmpty } from "class-validator"

@InputType()
export class SaleDetailInputDto {

  @Field(() => ID, { nullable: true })
  saleId: string

  @Field(() => ID)
  @IsNotEmpty()
  productId: string

  @Field(() => Int)
  @IsNotEmpty()
  quantity: number

  @Field(() => Float)
  @IsNotEmpty()
  price: number
}
