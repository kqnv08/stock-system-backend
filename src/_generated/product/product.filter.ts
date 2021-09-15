import { BaseFilterFields, FilteredFloat, FilteredID, FilteredInt, FilteredString } from "@merlin-gql/core";
import { Field, InputType } from "type-graphql";
import { CategoryFilters } from "../category/category.filter";

@InputType()
export class ProductFilters extends BaseFilterFields {
    @Field((_) => [ProductFilters], { nullable: true })
    or?: ProductFilters[];

    @Field((_) => [ProductFilters], { nullable: true })
    and?: ProductFilters[];

    @Field((_) => FilteredID, { nullable: true })
    id?: number;

    @Field((_) => FilteredString, { nullable: true })
    name?: string;

    @Field((_) => FilteredFloat, { nullable: true })
    price?: number;

    @Field((_) => FilteredInt, { nullable: true })
    categoryId?: number;

    @Field((_) => CategoryFilters, { nullable: true })
    category?: CategoryFilters;
}
