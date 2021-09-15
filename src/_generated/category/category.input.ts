import { BaseInputFields } from "@merlin-gql/core";
import { Field, InputType } from "type-graphql";
import { Category } from "../../models/category/category.model";

@InputType()
export class CategoryCreateInput extends BaseInputFields implements Partial<Category> {
    @Field((_) => String, { nullable: true })
    name?: string;
}

@InputType()
export class CategoryUpdateInput extends BaseInputFields implements Partial<Category> {
    @Field((_) => String, { nullable: true })
    name?: string;
}
