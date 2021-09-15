import { CreateResolver, DeleteResolver, FindResolver, ListResolver, UpdateResolver } from "@merlin-gql/core";
import { Resolver } from "type-graphql";
import { Sale } from "../../models/sale/sale.model";
import { SaleFilters } from "./sale.filter";
import { SaleCreateInput, SaleUpdateInput } from "./sale.input";
import { SaleSorts } from "./sale.sort";

const BaseListResolver = ListResolver(Sale, SaleFilters, SaleSorts);
@Resolver()
export class SaleListResolver extends BaseListResolver<Sale, SaleFilters, SaleSorts> {}

const BaseFindResolver = FindResolver(Sale);
@Resolver()
export class SaleFindResolver extends BaseFindResolver<Sale> {}

const BaseUpdateResolver = UpdateResolver(Sale, SaleUpdateInput);
@Resolver()
export class SaleUpdateResolver extends BaseUpdateResolver<Sale> {}

const BaseCreateResolver = CreateResolver(Sale, SaleCreateInput);
@Resolver()
export class SaleCreateResolver extends BaseCreateResolver<Sale> {}

const BaseDeleteResolver = DeleteResolver(Sale);
@Resolver()
export class SaleDeleteResolver extends BaseDeleteResolver<Sale> {}
