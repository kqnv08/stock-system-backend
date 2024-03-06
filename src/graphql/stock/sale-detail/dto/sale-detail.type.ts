import { Field, PartialType, ObjectType } from "@nestjs/graphql"

import { ListPageInfoResponse } from "src/core/lib"

import { SaleDetail } from "../entities/sale-detail.entity"

@ObjectType()
export class SaleDetailListPageInfoResponse extends PartialType(ListPageInfoResponse) {
  @Field(() => [SaleDetail], { nullable: true })
  data?: SaleDetail[]
}
