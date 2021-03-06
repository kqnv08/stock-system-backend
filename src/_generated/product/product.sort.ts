import { BaseSortFields, SortField } from "@merlin-gql/core";
import { Field, InputType } from "type-graphql";

@InputType()
export class ProductSorts extends BaseSortFields {
    @Field((_) => SortField, { nullable: true })
    id?: SortField;

    @Field((_) => SortField, { nullable: true })
    name?: SortField;

    @Field((_) => SortField, { nullable: true })
    price?: SortField;

    @Field((_) => SortField, { nullable: true })
    categoryId?: SortField;
}
