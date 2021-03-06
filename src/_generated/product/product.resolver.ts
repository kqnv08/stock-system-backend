import { CreateResolver, DeleteResolver, FindResolver, ListResolver, UpdateResolver } from "@merlin-gql/core";
import { Resolver } from "type-graphql";
import { Product } from "../../models/product/product.model";
import { ProductFilters } from "./product.filter";
import { ProductCreateInput, ProductUpdateInput } from "./product.input";
import { ProductSorts } from "./product.sort";

const BaseListResolver = ListResolver(Product, ProductFilters, ProductSorts);
@Resolver()
export class ProductListResolver extends BaseListResolver<Product, ProductFilters, ProductSorts> {}

const BaseFindResolver = FindResolver(Product);
@Resolver()
export class ProductFindResolver extends BaseFindResolver<Product> {}

const BaseUpdateResolver = UpdateResolver(Product, ProductUpdateInput);
@Resolver()
export class ProductUpdateResolver extends BaseUpdateResolver<Product> {}

const BaseCreateResolver = CreateResolver(Product, ProductCreateInput);
@Resolver()
export class ProductCreateResolver extends BaseCreateResolver<Product> {}

const BaseDeleteResolver = DeleteResolver(Product);
@Resolver()
export class ProductDeleteResolver extends BaseDeleteResolver<Product> {}
