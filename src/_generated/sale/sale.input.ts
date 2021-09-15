import { BaseInputFields } from "@merlin-gql/core";
import { Field, InputType } from "type-graphql";
import { Sale } from "../../models/sale/sale.model";

@InputType()
export class SaleCreateInput extends BaseInputFields implements Partial<Sale> {
    @Field((_) => Date, { nullable: true })
    deletedDate?: Date;

    @Field((_) => Date)
    created: Date = new Date();
}

@InputType()
export class SaleUpdateInput extends BaseInputFields implements Partial<Sale> {
    @Field((_) => Date, { nullable: true })
    deletedDate?: Date;

    @Field((_) => Date, { nullable: true })
    created?: Date;
}
