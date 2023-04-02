import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/core/lib";
import { Repository } from "typeorm";
import { Role } from "./entities/role.entity";

@Injectable()
export class RoleService extends BaseService<Role>{
  constructor(
    @InjectRepository(Role)
    private readonly engineRepository: Repository<Role>
  ) {
    super(engineRepository)

    this.modelClass = Role
  }
}
