import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql"

import { FilterCriteriaInfo } from "src/core/lib"

import { SaleDetailService } from "./sale-detail.service"
import { SaleDetail } from "./entities/sale-detail.entity"

import { SaleDetailInputDto } from "./dto/sale-detail.dto"
import { SaleDetailListPageInfoResponse } from "./dto/sale-detail.type"

@Resolver(() => SaleDetail)
export class SaleDetailResolver {
  constructor(private readonly engineService: SaleDetailService) { }

  @Query(() => SaleDetailListPageInfoResponse)
  async saleDetailListPage(@Args("saleDetailCriteria", { type: () => FilterCriteriaInfo }) saleDetailCriteria: FilterCriteriaInfo) {
    return await this.engineService.listPage(saleDetailCriteria)
  }

  @Query(() => [SaleDetail], { name: "saleDetailFindAll" })
  async findAll(@Args("criteria", { type: () => FilterCriteriaInfo, nullable: true }) criteria: FilterCriteriaInfo) {
    return await this.engineService.findAll(criteria)
  }

  @Query(() => SaleDetail, { name: "saleDetail" })
  async findOne(@Args("id", { type: () => Int }) id: number) {
    return await this.engineService.findOne(id)
  }

  @Mutation(() => SaleDetail)
  async createSaleDetail(@Args("saleDetailInputDto") saleDetailInputDto: SaleDetailInputDto) {
    return await this.engineService.create(saleDetailInputDto)
  }

  @Mutation(() => SaleDetail)
  async updateSaleDetail(@Args("id", { type: () => Int }) id: number, @Args("saleDetailInputDto") saleDetailInputDto: SaleDetailInputDto) {
    return await this.engineService.update(id, saleDetailInputDto)
  }

  @Mutation(() => SaleDetail)
  async removeSaleDetail(@Args("id", { type: () => Int }) id: number) {
    return await this.engineService.remove(id)
  }
}
