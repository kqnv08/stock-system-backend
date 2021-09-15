import { BaseInputFields } from "@merlin-gql/core";
import { Field, ID, InputType } from "type-graphql";
import { SaleDetail } from "../../models/sale-detail/sale-detail.model";

@InputType()
export class SaleDetailCreateInput extends BaseInputFields implements Partial<SaleDetail> {
    @Field((_) => Date, { nullable: true })
    deletedDate?: Date;

    @Field((_) => Date)
    created: Date = new Date();

    @Field((_) => ID, { nullable: true })
    itemPriceListId?: number;

    @Field((_) => ID, { nullable: true })
    saleId?: number;
}

@InputType()
export class SaleDetailUpdateInput extends BaseInputFields implements Partial<SaleDetail> {
    @Field((_) => Date, { nullable: true })
    deletedDate?: Date;

    @Field((_) => Date, { nullable: true })
    created?: Date;

    @Field((_) => ID, { nullable: true })
    itemPriceListId?: number;

    @Field((_) => ID, { nullable: true })
    saleId?: number;
}
