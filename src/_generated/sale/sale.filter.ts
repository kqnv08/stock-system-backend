import { BaseFilterFields, FilteredDate, FilteredID } from "@merlin-gql/core";
import { Field, InputType } from "type-graphql";
import { SaleDetailFilters } from "../sale-detail/sale-detail.filter";

@InputType()
export class SaleFilters extends BaseFilterFields {
    @Field((_) => [SaleFilters], { nullable: true })
    or?: SaleFilters[];

    @Field((_) => [SaleFilters], { nullable: true })
    and?: SaleFilters[];

    @Field((_) => FilteredID, { nullable: true })
    id?: number;

    @Field((_) => FilteredDate, { nullable: true })
    deletedDate?: Date;

    @Field((_) => FilteredDate, { nullable: true })
    created?: Date;

    @Field((_) => SaleDetailFilters, { nullable: true })
    saleDetails?: SaleDetailFilters;
}
