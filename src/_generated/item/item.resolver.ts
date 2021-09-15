import { CreateResolver, DeleteResolver, FindResolver, ListResolver, UpdateResolver } from "@merlin-gql/core";
import { Resolver } from "type-graphql";
import { Item } from "../../models/item/item.model";
import { ItemFilters } from "./item.filter";
import { ItemCreateInput, ItemUpdateInput } from "./item.input";
import { ItemSorts } from "./item.sort";

const BaseListResolver = ListResolver(Item, ItemFilters, ItemSorts);
@Resolver()
export class ItemListResolver extends BaseListResolver<Item, ItemFilters, ItemSorts> {}

const BaseFindResolver = FindResolver(Item);
@Resolver()
export class ItemFindResolver extends BaseFindResolver<Item> {}

const BaseUpdateResolver = UpdateResolver(Item, ItemUpdateInput);
@Resolver()
export class ItemUpdateResolver extends BaseUpdateResolver<Item> {}

const BaseCreateResolver = CreateResolver(Item, ItemCreateInput);
@Resolver()
export class ItemCreateResolver extends BaseCreateResolver<Item> {}

const BaseDeleteResolver = DeleteResolver(Item);
@Resolver()
export class ItemDeleteResolver extends BaseDeleteResolver<Item> {}
