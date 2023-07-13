import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";

import { FilterCriteriaInfo } from "src/core/lib";

import { ProductService } from "./product.service";
import { Product } from "./entities/product.entity";

import { ProductInputDto } from "./dto/product.dto";
import { ProductListPageInfoResponse } from "./dto/product.type";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/core/lib/auth/guards/jwt-auth.guard";
import { RoleGuard } from "src/core/lib/auth/guards/roles.guard";
import { RoleEnum } from "src/core/enums/role.enum";
import { Roles } from "src/core/lib/auth/decorators/role.decorator";

@UseGuards(JwtAuthGuard, RoleGuard)
@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly engineService: ProductService) { }

  // @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @Query(() => ProductListPageInfoResponse)
  async productListPage(
    @Args("productCriteria", { type: () => FilterCriteriaInfo })
    productCriteria: FilterCriteriaInfo
  ) {
    return await this.engineService.listPage(productCriteria);
  }

  // @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @Query(() => [Product], { name: "productFindAll" })
  async findAll(
    @Args("criteria", { type: () => FilterCriteriaInfo, nullable: true })
    criteria: FilterCriteriaInfo
  ) {
    return await this.engineService.findAll(criteria);
  }


  @Query(() => Product, { name: "product" })
  async findOne(@Args("id", { type: () => Int }) id: number) {
    return await this.engineService.findOne(id);
  }

  // @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @Mutation(() => Product)
  async createProduct(@Args("productInputDto") productInputDto: ProductInputDto) {
    return await this.engineService.create(productInputDto);
  }

  // @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @Mutation(() => Product)
  async updateProduct(
    @Args("id", { type: () => Int }) id: number,
    @Args("productInputDto") productInputDto: ProductInputDto
  ) {
    return await this.engineService.update(id, productInputDto);
  }

  // @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @Mutation(() => Product)
  async removeProduct(@Args("id", { type: () => Int }) id: number) {
    return await this.engineService.remove(id);
  }
}
