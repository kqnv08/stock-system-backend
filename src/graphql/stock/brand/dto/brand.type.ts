import { Field, PartialType, ObjectType } from "@nestjs/graphql"

import { ListPageInfoResponse } from "src/core/lib"

import { Brand } from "../entities/brand.entity"

@ObjectType()
export class BrandListPageInfoResponse extends PartialType(ListPageInfoResponse) {
  @Field(() => [Brand], { nullable: true })
  data?: Brand[]
}
