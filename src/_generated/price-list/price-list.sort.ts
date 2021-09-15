import { BaseSortFields, SortField } from "@merlin-gql/core";
import { Field, InputType } from "type-graphql";

@InputType()
export class PriceListSorts extends BaseSortFields {
    @Field((_) => SortField, { nullable: true })
    id?: SortField;

    @Field((_) => SortField, { nullable: true })
    name?: SortField;

    @Field((_) => SortField, { nullable: true })
    created?: SortField;
}
