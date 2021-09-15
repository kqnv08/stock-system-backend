import { BaseInputFields } from "@merlin-gql/core";
import { Field, InputType } from "type-graphql";
import { Store } from "../../models/store/store.model";

@InputType()
export class StoreCreateInput extends BaseInputFields implements Partial<Store> {
    @Field((_) => String)
    name: string = "";

    @Field((_) => String)
    address: string = "";

    @Field((_) => Date, { nullable: true })
    deletedDate?: Date;
}

@InputType()
export class StoreUpdateInput extends BaseInputFields implements Partial<Store> {
    @Field((_) => String, { nullable: true })
    name?: string;

    @Field((_) => String, { nullable: true })
    address?: string;

    @Field((_) => Date, { nullable: true })
    deletedDate?: Date;
}
