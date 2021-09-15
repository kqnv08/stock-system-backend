import { CreateResolver, DeleteResolver, FindResolver, ListResolver, UpdateResolver } from "@merlin-gql/core";
import { Resolver } from "type-graphql";
import { ItemPriceList } from "../../models/item-price-list/item-price-list.model";
import { ItemPriceListFilters } from "./item-price-list.filter";
import { ItemPriceListCreateInput, ItemPriceListUpdateInput } from "./item-price-list.input";
import { ItemPriceListSorts } from "./item-price-list.sort";

const BaseListResolver = ListResolver(ItemPriceList, ItemPriceListFilters, ItemPriceListSorts);
@Resolver()
export class ItemPriceListListResolver extends BaseListResolver<ItemPriceList, ItemPriceListFilters, ItemPriceListSorts> {}

const BaseFindResolver = FindResolver(ItemPriceList);
@Resolver()
export class ItemPriceListFindResolver extends BaseFindResolver<ItemPriceList> {}

const BaseUpdateResolver = UpdateResolver(ItemPriceList, ItemPriceListUpdateInput);
@Resolver()
export class ItemPriceListUpdateResolver extends BaseUpdateResolver<ItemPriceList> {}

const BaseCreateResolver = CreateResolver(ItemPriceList, ItemPriceListCreateInput);
@Resolver()
export class ItemPriceListCreateResolver extends BaseCreateResolver<ItemPriceList> {}

const BaseDeleteResolver = DeleteResolver(ItemPriceList);
@Resolver()
export class ItemPriceListDeleteResolver extends BaseDeleteResolver<ItemPriceList> {}
