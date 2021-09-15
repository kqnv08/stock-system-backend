import { BaseInputFields } from "@merlin-gql/core";
import { Field, InputType, Int } from "type-graphql";
import { Item } from "../../models/item/item.model";

@InputType()
export class ItemCreateInput extends BaseInputFields implements Partial<Item> {
    @Field((_) => String)
    name: string = "";

    @Field((_) => String)
    code: string = "";

    @Field((_) => Date, { nullable: true })
    deletedDate?: Date;

    @Field((_) => Int, { nullable: true })
    stock?: number;
}

@InputType()
export class ItemUpdateInput extends BaseInputFields implements Partial<Item> {
    @Field((_) => String, { nullable: true })
    name?: string;

    @Field((_) => String, { nullable: true })
    code?: string;

    @Field((_) => Date, { nullable: true })
    deletedDate?: Date;

    @Field((_) => Int, { nullable: true })
    stock?: number;
}
