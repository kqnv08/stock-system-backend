import { Resolver, Query, Mutation, Args, Int, ResolveField, Float, Parent, ID } from "@nestjs/graphql"

import { FilterCriteriaInfo } from "src/core/lib"

import { SaleService } from "./sale.service"
import { Sale } from "./entities/sale.entity"

import { NewSaleInputDto, SaleInputDto } from "./dto/sale.dto"
import { SaleListPageInfoResponse } from "./dto/sale.type"
import { GenericResult } from "src/core/lib/interfaces/generic-result.interface"

@Resolver(() => Sale)
export class SaleResolver {
  constructor(private readonly engineService: SaleService) { }

  @Query(() => SaleListPageInfoResponse)
  async saleListPage(@Args("saleCriteria", { type: () => FilterCriteriaInfo }) saleCriteria: FilterCriteriaInfo) {
    return await this.engineService.listPage(saleCriteria)
  }

  @Query(() => [Sale], { name: "saleFindAll" })
  async findAll(@Args("criteria", { type: () => FilterCriteriaInfo, nullable: true }) criteria: FilterCriteriaInfo) {
    return await this.engineService.findAll(criteria)
  }

  @Query(() => Sale, { name: "sale" })
  async findOne(@Args("id", { type: () => ID }) id: number) {
    return await this.engineService.findOne(id)
  }

  @Mutation(() => Sale)

  async updateSale(@Args("id", { type: () => ID }) id: number, @Args("saleInputDto") saleInputDto: SaleInputDto) {
    return await this.engineService.update(id, saleInputDto)
  }

  @Mutation(() => Sale)
  async removeSale(@Args("id", { type: () => ID }) id: number) {
    return await this.engineService.remove(id)
  }

  @ResolveField(() => Float, { name: 'total' })
  async calculateTotal(@Parent() sale: Sale): Promise<number | null> {
    const details = await sale.details
    const total = details.reduce((sum, detail) => sum + (detail.total || 0), 0);
    return total
  }

  @Mutation(() => GenericResult)
  async createSale(@Args("saleInputDto") saleInputDto: NewSaleInputDto) {
    return await this.engineService.createSale(saleInputDto)
  }
}
