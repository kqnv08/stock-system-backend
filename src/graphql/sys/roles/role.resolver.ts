import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql"
import { UseGuards } from "@nestjs/common"

import { FilterCriteriaInfo } from "src/core/lib"
import { JwtAuthGuard } from "src/core/lib/auth/guards/jwt-auth.guard"
import { Role } from "./entities/role.entity"
import { RoleService } from "./role.service"
import { RoleInputDto } from "./dto/role.dto"
import { RoleListPageInfoResponse } from "./dto/role.type"
import { RoleGuard } from "src/core/lib/auth/guards/roles.guard"
import { RoleEnum } from "src/core/enums/role.enum"
import { Roles } from "src/core/lib/auth/decorators/role.decorator"

@UseGuards(JwtAuthGuard, RoleGuard)
@Resolver(() => Role)
export class RoleResolver {

  constructor(private readonly engineService: RoleService) { }

  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @Query(() => RoleListPageInfoResponse)
  async roleListPage(@Args("roleCriteria", { type: () => FilterCriteriaInfo }) roleCriteria: FilterCriteriaInfo) {
    return await this.engineService.listPage(roleCriteria)
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @Query(() => [Role], { name: "roleFindAll" })
  async findAll(@Args("criteria", { type: () => FilterCriteriaInfo, nullable: true }) criteria: FilterCriteriaInfo) {
    return await this.engineService.findAll(criteria)
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @Query(() => Role, { name: "role" })
  async findOne(@Args("id", { type: () => Int }) id: number) {
    return await this.engineService.findOne(id)
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @Mutation(() => Role)
  async createRole(@Args("roleInputDto") roleInputDto: RoleInputDto) {
    return await this.engineService.create(roleInputDto)
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @Mutation(() => Role)
  async updateRole(@Args("id", { type: () => Int }) id: number, @Args("roleInputDto") roleInputDto: RoleInputDto) {
    return await this.engineService.update(id, roleInputDto)
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @Mutation(() => Role)
  async removeRole(@Args("id", { type: () => Int }) id: number) {
    return await this.engineService.remove(id)
  }
}
