import { BaseSortFields, SortField } from "@merlin-gql/core";
import { Field, InputType } from "type-graphql";
import { SaleDetailSorts } from "../sale-detail/sale-detail.sort";

@InputType()
export class SaleSorts extends BaseSortFields {
    @Field((_) => SortField, { nullable: true })
    id?: SortField;

    @Field((_) => SortField, { nullable: true })
    created?: SortField;

    @Field((_) => SaleDetailSorts, { nullable: true })
    saleDetails?: SaleDetailSorts;
}
