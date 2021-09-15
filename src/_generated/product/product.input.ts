import { BaseInputFields } from "@merlin-gql/core";
import { Field, Float, InputType, Int } from "type-graphql";
import { Product } from "../../models/product/product.model";

@InputType()
export class ProductCreateInput extends BaseInputFields implements Partial<Product> {
    @Field((_) => String, { nullable: true })
    name?: string;

    @Field((_) => Float)
    price: number = 0;

    @Field((_) => Int, { nullable: true })
    categoryId?: number;
}

@InputType()
export class ProductUpdateInput extends BaseInputFields implements Partial<Product> {
    @Field((_) => String, { nullable: true })
    name?: string;

    @Field((_) => Float, { nullable: true })
    price?: number;

    @Field((_) => Int, { nullable: true })
    categoryId?: number;
}
