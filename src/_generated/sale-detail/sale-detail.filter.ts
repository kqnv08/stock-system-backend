import { BaseFilterFields, FilteredDate, FilteredID } from "@merlin-gql/core";
import { Field, InputType } from "type-graphql";
import { ItemPriceListFilters } from "../item-price-list/item-price-list.filter";
import { SaleFilters } from "../sale/sale.filter";

@InputType()
export class SaleDetailFilters extends BaseFilterFields {
    @Field((_) => [SaleDetailFilters], { nullable: true })
    or?: SaleDetailFilters[];

    @Field((_) => [SaleDetailFilters], { nullable: true })
    and?: SaleDetailFilters[];

    @Field((_) => FilteredID, { nullable: true })
    id?: number;

    @Field((_) => FilteredDate, { nullable: true })
    deletedDate?: Date;

    @Field((_) => FilteredDate, { nullable: true })
    created?: Date;

    @Field((_) => FilteredID, { nullable: true })
    itemPriceListId?: number;

    @Field((_) => FilteredID, { nullable: true })
    saleId?: number;

    @Field((_) => ItemPriceListFilters, { nullable: true })
    itemPriceList?: ItemPriceListFilters;

    @Field((_) => SaleFilters, { nullable: true })
    sale?: SaleFilters;
}
