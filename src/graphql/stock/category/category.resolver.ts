import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql"

import { FilterCriteriaInfo } from "src/core/lib"

import { CategoryService } from "./category.service"
import { Category } from "./entities/category.entity"

import { CategoryInputDto } from "./dto/category.dto"
import { CategoryListPageInfoResponse } from "./dto/category.type"

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly engineService: CategoryService) {}

  @Query(() => CategoryListPageInfoResponse)
  async categoryListPage(@Args("categoryCriteria", { type: () => FilterCriteriaInfo }) categoryCriteria: FilterCriteriaInfo) {
    return await this.engineService.listPage(categoryCriteria)
  }

  @Query(() => [Category], { name: "categoryFindAll" })
  async findAll(@Args("criteria", { type: () => FilterCriteriaInfo, nullable: true }) criteria: FilterCriteriaInfo) {
    return await this.engineService.findAll(criteria)
  }

  @Query(() => Category, { name: "category" })
  async findOne(@Args("id", { type: () => Int }) id: number) {
    return await this.engineService.findOne(id)
  }

  @Mutation(() => Category)
  async createCategory(@Args("categoryInputDto") categoryInputDto: CategoryInputDto) {
    return await this.engineService.create(categoryInputDto)
  }

  @Mutation(() => Category)
  async updateCategory(@Args("id", { type: () => Int }) id: number, @Args("categoryInputDto") categoryInputDto: CategoryInputDto) {
    return await this.engineService.update(id, categoryInputDto)
  }

  @Mutation(() => Category)
  async removeCategory(@Args("id", { type: () => Int }) id: number) {
    return await this.engineService.remove(id)
  }
}
