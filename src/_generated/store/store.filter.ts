import { BaseFilterFields, FilteredDate, FilteredID, FilteredString } from "@merlin-gql/core";
import { Field, InputType } from "type-graphql";

@InputType()
export class StoreFilters extends BaseFilterFields {
    @Field((_) => [StoreFilters], { nullable: true })
    or?: StoreFilters[];

    @Field((_) => [StoreFilters], { nullable: true })
    and?: StoreFilters[];

    @Field((_) => FilteredID, { nullable: true })
    id?: number;

    @Field((_) => FilteredString, { nullable: true })
    name?: string;

    @Field((_) => FilteredString, { nullable: true })
    address?: string;

    @Field((_) => FilteredDate, { nullable: true })
    deletedDate?: Date;
}
