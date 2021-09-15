import { CreateResolver, DeleteResolver, FindResolver, ListResolver, UpdateResolver } from "@merlin-gql/core";
import { Resolver } from "type-graphql";
import { Store } from "../../models/store/store.model";
import { StoreFilters } from "./store.filter";
import { StoreCreateInput, StoreUpdateInput } from "./store.input";
import { StoreSorts } from "./store.sort";

const BaseListResolver = ListResolver(Store, StoreFilters, StoreSorts);
@Resolver()
export class StoreListResolver extends BaseListResolver<Store, StoreFilters, StoreSorts> {}

const BaseFindResolver = FindResolver(Store);
@Resolver()
export class StoreFindResolver extends BaseFindResolver<Store> {}

const BaseUpdateResolver = UpdateResolver(Store, StoreUpdateInput);
@Resolver()
export class StoreUpdateResolver extends BaseUpdateResolver<Store> {}

const BaseCreateResolver = CreateResolver(Store, StoreCreateInput);
@Resolver()
export class StoreCreateResolver extends BaseCreateResolver<Store> {}

const BaseDeleteResolver = DeleteResolver(Store);
@Resolver()
export class StoreDeleteResolver extends BaseDeleteResolver<Store> {}
