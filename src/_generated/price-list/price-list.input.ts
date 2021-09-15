import { BaseInputFields } from "@merlin-gql/core";
import { Field, InputType } from "type-graphql";
import { PriceList } from "../../models/price-list/price-list.model";

@InputType()
export class PriceListCreateInput extends BaseInputFields implements Partial<PriceList> {
    @Field((_) => String)
    name: string = "";

    @Field((_) => Date, { nullable: true })
    deletedDate?: Date;

    @Field((_) => Date, { nullable: true })
    created?: Date;
}

@InputType()
export class PriceListUpdateInput extends BaseInputFields implements Partial<PriceList> {
    @Field((_) => String, { nullable: true })
    name?: string;

    @Field((_) => Date, { nullable: true })
    deletedDate?: Date;

    @Field((_) => Date, { nullable: true })
    created?: Date;
}
