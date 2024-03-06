import { Field, PartialType, ObjectType } from "@nestjs/graphql"

import { ListPageInfoResponse } from "src/core/lib"

import { Sale } from "../entities/sale.entity"

@ObjectType()
export class SaleListPageInfoResponse extends PartialType(ListPageInfoResponse) {
  @Field(() => [Sale], { nullable: true })
  data?: Sale[]
}
