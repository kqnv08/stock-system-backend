import { BaseSortFields, SortField } from "@merlin-gql/core";
import { Field, InputType } from "type-graphql";
import { ItemPriceListSorts } from "../item-price-list/item-price-list.sort";
import { SaleSorts } from "../sale/sale.sort";

@InputType()
export class SaleDetailSorts extends BaseSortFields {
    @Field((_) => SortField, { nullable: true })
    id?: SortField;

    @Field((_) => SortField, { nullable: true })
    created?: SortField;

    @Field((_) => SortField, { nullable: true })
    itemPriceListId?: SortField;

    @Field((_) => SortField, { nullable: true })
    saleId?: SortField;

    @Field((_) => ItemPriceListSorts, { nullable: true })
    itemPriceList?: ItemPriceListSorts;

    @Field((_) => SaleSorts, { nullable: true })
    sale?: SaleSorts;
}
