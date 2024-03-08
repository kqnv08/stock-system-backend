import { Resolver, Query, Mutation, Args, Int, ID } from "@nestjs/graphql";

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
import { Public } from "src/core/lib/auth/decorators/public.decorator";
import { GenericResult } from "src/core/lib/interfaces/generic-result.interface";

@UseGuards(JwtAuthGuard, RoleGuard)
@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly engineService: ProductService) { }

  @Public()
  @Query(() => ProductListPageInfoResponse)
  async productListPage(
    @Args("productCriteria", { type: () => FilterCriteriaInfo, nullable: true })
    productCriteria: FilterCriteriaInfo
  ) {
    return await this.engineService.listPage(productCriteria);
  }

  @Public()
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

  @Public()
  @Mutation(() => Product)
  async createProduct(@Args("productInputDto") productInputDto: ProductInputDto) {
    return await this.engineService.create(productInputDto);
  }

  @Public()
  @Mutation(() => Product)
  async updateProduct(
    @Args("id", { type: () => ID }) id: number | string,
    @Args("productInputDto") productInputDto: ProductInputDto
  ) {
    return await this.engineService.update(id, productInputDto);
  }

  // @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @Mutation(() => Product)
  async removeProduct(@Args("id", { type: () => Int }) id: number) {
    return await this.engineService.remove(id);
  }

  @Public()
  @Mutation(() => GenericResult)
  async loadProduct() {
    return await this.engineService.loadProduct();
  }
}
