import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { BaseService } from "src/core/lib"

import { Brand } from "./entities/brand.entity"

@Injectable()
export class BrandService extends BaseService<Brand> {
  constructor(
    @InjectRepository(Brand)
    private readonly engineRepository: Repository<Brand>
  ) {
    super(engineRepository)

    this.modelClass = Brand
  }

}
