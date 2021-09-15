import { BaseFilterFields, FilteredDate, FilteredID } from "@merlin-gql/core";
import { Field, InputType } from "type-graphql";
import { ItemFilters } from "../item/item.filter";
import { PriceListFilters } from "../price-list/price-list.filter";
import { SaleDetailFilters } from "../sale-detail/sale-detail.filter";

@InputType()
export class ItemPriceListFilters extends BaseFilterFields {
    @Field((_) => [ItemPriceListFilters], { nullable: true })
    or?: ItemPriceListFilters[];

    @Field((_) => [ItemPriceListFilters], { nullable: true })
    and?: ItemPriceListFilters[];

    @Field((_) => FilteredID, { nullable: true })
    id?: number;

    @Field((_) => FilteredID, { nullable: true })
    itemId?: number;

    @Field((_) => FilteredID, { nullable: true })
    priceListId?: number;

    @Field((_) => FilteredDate, { nullable: true })
    deletedDate?: Date;

    @Field((_) => FilteredDate, { nullable: true })
    created?: Date;

    @Field((_) => ItemFilters, { nullable: true })
    item?: ItemFilters;

    @Field((_) => PriceListFilters, { nullable: true })
    priceList?: PriceListFilters;

    @Field((_) => SaleDetailFilters, { nullable: true })
    saleDetails?: SaleDetailFilters;
}
