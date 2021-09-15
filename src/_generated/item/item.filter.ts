import { BaseFilterFields, FilteredDate, FilteredID, FilteredInt, FilteredString } from "@merlin-gql/core";
import { Field, InputType } from "type-graphql";
import { ItemPriceListFilters } from "../item-price-list/item-price-list.filter";

@InputType()
export class ItemFilters extends BaseFilterFields {
    @Field((_) => [ItemFilters], { nullable: true })
    or?: ItemFilters[];

    @Field((_) => [ItemFilters], { nullable: true })
    and?: ItemFilters[];

    @Field((_) => FilteredID, { nullable: true })
    id?: number;

    @Field((_) => FilteredString, { nullable: true })
    name?: string;

    @Field((_) => FilteredString, { nullable: true })
    code?: string;

    @Field((_) => FilteredDate, { nullable: true })
    deletedDate?: Date;

    @Field((_) => FilteredInt, { nullable: true })
    stock?: number;

    @Field((_) => ItemPriceListFilters, { nullable: true })
    itemPriceList?: ItemPriceListFilters;
}
