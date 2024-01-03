import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";

import { FilterCriteriaInfo } from "src/core/lib";

import { BrandService } from "./brand.service";
import { Brand } from "./entities/brand.entity";

import { BrandInputDto } from "./dto/brand.dto";
import { BrandListPageInfoResponse } from "./dto/brand.type";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/core/lib/auth/guards/jwt-auth.guard";
import { RoleGuard } from "src/core/lib/auth/guards/roles.guard";
import { RoleEnum } from "src/core/enums/role.enum";
import { Roles } from "src/core/lib/auth/decorators/role.decorator";
import { Public } from "src/core/lib/auth/decorators/public.decorator";

@UseGuards(JwtAuthGuard, RoleGuard)
@Resolver(() => Brand)
export class BrandResolver {
  constructor(private readonly engineService: BrandService) { }

  @Public()
  @Query(() => BrandListPageInfoResponse)
  async brandListPage(
    @Args("brandCriteria", { type: () => FilterCriteriaInfo, nullable: true })
    brandCriteria: FilterCriteriaInfo
  ) {
    return await this.engineService.listPage(brandCriteria);
  }

  // @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @Query(() => [Brand], { name: "brandFindAll" })
  async findAll(
    @Args("criteria", { type: () => FilterCriteriaInfo, nullable: true })
    criteria: FilterCriteriaInfo
  ) {
    return await this.engineService.findAll(criteria);
  }


  @Query(() => Brand, { name: "brand" })
  async findOne(@Args("id", { type: () => Int }) id: number) {
    return await this.engineService.findOne(id);
  }

  // @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @Mutation(() => Brand)
  async createBrand(@Args("brandInputDto") brandInputDto: BrandInputDto) {
    return await this.engineService.create(brandInputDto);
  }

  // @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @Mutation(() => Brand)
  async updateBrand(
    @Args("id", { type: () => Int }) id: number,
    @Args("brandInputDto") brandInputDto: BrandInputDto
  ) {
    return await this.engineService.update(id, brandInputDto);
  }

  // @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @Mutation(() => Brand)
  async removeBrand(@Args("id", { type: () => Int }) id: number) {
    return await this.engineService.remove(id);
  }
}
