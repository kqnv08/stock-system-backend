import { BaseFilterFields, FilteredID, FilteredString } from "@merlin-gql/core";
import { Field, InputType } from "type-graphql";

@InputType()
export class CategoryFilters extends BaseFilterFields {
    @Field((_) => [CategoryFilters], { nullable: true })
    or?: CategoryFilters[];

    @Field((_) => [CategoryFilters], { nullable: true })
    and?: CategoryFilters[];

    @Field((_) => FilteredID, { nullable: true })
    id?: number;

    @Field((_) => FilteredString, { nullable: true })
    name?: string;
}
