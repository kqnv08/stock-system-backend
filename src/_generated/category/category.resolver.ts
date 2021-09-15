import { CreateResolver, DeleteResolver, FindResolver, ListResolver, UpdateResolver } from "@merlin-gql/core";
import { Resolver } from "type-graphql";
import { Category } from "../../models/category/category.model";
import { CategoryFilters } from "./category.filter";
import { CategoryCreateInput, CategoryUpdateInput } from "./category.input";
import { CategorySorts } from "./category.sort";

const BaseListResolver = ListResolver(Category, CategoryFilters, CategorySorts);
@Resolver()
export class CategoryListResolver extends BaseListResolver<Category, CategoryFilters, CategorySorts> {}

const BaseFindResolver = FindResolver(Category);
@Resolver()
export class CategoryFindResolver extends BaseFindResolver<Category> {}

const BaseUpdateResolver = UpdateResolver(Category, CategoryUpdateInput);
@Resolver()
export class CategoryUpdateResolver extends BaseUpdateResolver<Category> {}

const BaseCreateResolver = CreateResolver(Category, CategoryCreateInput);
@Resolver()
export class CategoryCreateResolver extends BaseCreateResolver<Category> {}

const BaseDeleteResolver = DeleteResolver(Category);
@Resolver()
export class CategoryDeleteResolver extends BaseDeleteResolver<Category> {}
