import { BaseSortFields, SortField } from "@merlin-gql/core";
import { Field, InputType } from "type-graphql";
import { ItemPriceListSorts } from "../item-price-list/item-price-list.sort";

@InputType()
export class ItemSorts extends BaseSortFields {
    @Field((_) => SortField, { nullable: true })
    id?: SortField;

    @Field((_) => SortField, { nullable: true })
    name?: SortField;

    @Field((_) => SortField, { nullable: true })
    code?: SortField;

    @Field((_) => SortField, { nullable: true })
    stock?: SortField;

    @Field((_) => ItemPriceListSorts, { nullable: true })
    itemPriceList?: ItemPriceListSorts;
}
