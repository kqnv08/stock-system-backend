import { BaseInputFields } from "@merlin-gql/core";
import { Field, ID, InputType } from "type-graphql";
import { ItemPriceList } from "../../models/item-price-list/item-price-list.model";

@InputType()
export class ItemPriceListCreateInput extends BaseInputFields implements Partial<ItemPriceList> {
    @Field((_) => ID, { nullable: true })
    itemId?: number;

    @Field((_) => ID, { nullable: true })
    priceListId?: number;

    @Field((_) => Date, { nullable: true })
    deletedDate?: Date;

    @Field((_) => Date, { nullable: true })
    created?: Date;
}

@InputType()
export class ItemPriceListUpdateInput extends BaseInputFields implements Partial<ItemPriceList> {
    @Field((_) => ID, { nullable: true })
    itemId?: number;

    @Field((_) => ID, { nullable: true })
    priceListId?: number;

    @Field((_) => Date, { nullable: true })
    deletedDate?: Date;

    @Field((_) => Date, { nullable: true })
    created?: Date;
}
