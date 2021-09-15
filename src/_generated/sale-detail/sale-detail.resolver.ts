import { CreateResolver, DeleteResolver, FindResolver, ListResolver, UpdateResolver } from "@merlin-gql/core";
import { Resolver } from "type-graphql";
import { SaleDetail } from "../../models/sale-detail/sale-detail.model";
import { SaleDetailFilters } from "./sale-detail.filter";
import { SaleDetailCreateInput, SaleDetailUpdateInput } from "./sale-detail.input";
import { SaleDetailSorts } from "./sale-detail.sort";

const BaseListResolver = ListResolver(SaleDetail, SaleDetailFilters, SaleDetailSorts);
@Resolver()
export class SaleDetailListResolver extends BaseListResolver<SaleDetail, SaleDetailFilters, SaleDetailSorts> {}

const BaseFindResolver = FindResolver(SaleDetail);
@Resolver()
export class SaleDetailFindResolver extends BaseFindResolver<SaleDetail> {}

const BaseUpdateResolver = UpdateResolver(SaleDetail, SaleDetailUpdateInput);
@Resolver()
export class SaleDetailUpdateResolver extends BaseUpdateResolver<SaleDetail> {}

const BaseCreateResolver = CreateResolver(SaleDetail, SaleDetailCreateInput);
@Resolver()
export class SaleDetailCreateResolver extends BaseCreateResolver<SaleDetail> {}

const BaseDeleteResolver = DeleteResolver(SaleDetail);
@Resolver()
export class SaleDetailDeleteResolver extends BaseDeleteResolver<SaleDetail> {}
