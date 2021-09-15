import { BaseSortFields, SortField } from "@merlin-gql/core";
import { Field, InputType } from "type-graphql";
import { ItemSorts } from "../item/item.sort";
import { PriceListSorts } from "../price-list/price-list.sort";
import { SaleDetailSorts } from "../sale-detail/sale-detail.sort";

@InputType()
export class ItemPriceListSorts extends BaseSortFields {
    @Field((_) => SortField, { nullable: true })
    id?: SortField;

    @Field((_) => SortField, { nullable: true })
    itemId?: SortField;

    @Field((_) => SortField, { nullable: true })
    priceListId?: SortField;

    @Field((_) => SortField, { nullable: true })
    created?: SortField;

    @Field((_) => ItemSorts, { nullable: true })
    item?: ItemSorts;

    @Field((_) => PriceListSorts, { nullable: true })
    priceList?: PriceListSorts;

    @Field((_) => SaleDetailSorts, { nullable: true })
    saleDetails?: SaleDetailSorts;
}
