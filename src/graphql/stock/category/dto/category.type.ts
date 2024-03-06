import { Field, PartialType, ObjectType } from "@nestjs/graphql"

import { ListPageInfoResponse } from "src/core/lib"

import { Category } from "../entities/category.entity"

@ObjectType()
export class CategoryListPageInfoResponse extends PartialType(ListPageInfoResponse) {
  @Field(() => [Category], { nullable: true })
  data?: Category[]
}
