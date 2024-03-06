import { InputType, Field } from "@nestjs/graphql"
import { IsNotEmpty } from "class-validator"
import { SaleDetail } from "../../sale-detail/entities/sale-detail.entity"
import { SaleDetailInputDto } from "../../sale-detail/dto/sale-detail.dto"

@InputType()
export class SaleInputDto {
  @Field(() => String)
  @IsNotEmpty()
  name: string
}

@InputType()
export class NewSaleInputDto {
  @Field(() => [SaleDetailInputDto])
  @IsNotEmpty()
  saleDetails: Array<SaleDetailInputDto>
}