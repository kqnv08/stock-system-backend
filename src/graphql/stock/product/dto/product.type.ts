import { Field, PartialType, ObjectType } from "@nestjs/graphql"

import { ListPageInfoResponse } from "src/core/lib"

import { Product } from "../entities/product.entity"

@ObjectType()
export class ProductListPageInfoResponse extends PartialType(ListPageInfoResponse) {
  @Field(() => [Product], { nullable: true })
  data?: Product[]
}
