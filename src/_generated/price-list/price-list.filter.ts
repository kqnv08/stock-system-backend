import { BaseFilterFields, FilteredDate, FilteredID, FilteredString } from "@merlin-gql/core";
import { Field, InputType } from "type-graphql";

@InputType()
export class PriceListFilters extends BaseFilterFields {
    @Field((_) => [PriceListFilters], { nullable: true })
    or?: PriceListFilters[];

    @Field((_) => [PriceListFilters], { nullable: true })
    and?: PriceListFilters[];

    @Field((_) => FilteredID, { nullable: true })
    id?: number;

    @Field((_) => FilteredString, { nullable: true })
    name?: string;

    @Field((_) => FilteredDate, { nullable: true })
    deletedDate?: Date;

    @Field((_) => FilteredDate, { nullable: true })
    created?: Date;
}
