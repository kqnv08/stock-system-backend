import { CreateResolver, DeleteResolver, FindResolver, ListResolver, UpdateResolver } from "@merlin-gql/core";
import { Resolver } from "type-graphql";
import { PriceList } from "../../models/price-list/price-list.model";
import { PriceListFilters } from "./price-list.filter";
import { PriceListCreateInput, PriceListUpdateInput } from "./price-list.input";
import { PriceListSorts } from "./price-list.sort";

const BaseListResolver = ListResolver(PriceList, PriceListFilters, PriceListSorts);
@Resolver()
export class PriceListListResolver extends BaseListResolver<PriceList, PriceListFilters, PriceListSorts> {}

const BaseFindResolver = FindResolver(PriceList);
@Resolver()
export class PriceListFindResolver extends BaseFindResolver<PriceList> {}

const BaseUpdateResolver = UpdateResolver(PriceList, PriceListUpdateInput);
@Resolver()
export class PriceListUpdateResolver extends BaseUpdateResolver<PriceList> {}

const BaseCreateResolver = CreateResolver(PriceList, PriceListCreateInput);
@Resolver()
export class PriceListCreateResolver extends BaseCreateResolver<PriceList> {}

const BaseDeleteResolver = DeleteResolver(PriceList);
@Resolver()
export class PriceListDeleteResolver extends BaseDeleteResolver<PriceList> {}
