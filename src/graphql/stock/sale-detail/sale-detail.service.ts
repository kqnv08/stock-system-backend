import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { BaseService } from "src/core/lib"

import { SaleDetail } from "./entities/sale-detail.entity"

@Injectable()
export class SaleDetailService extends BaseService<SaleDetail> {
  constructor(
    @InjectRepository(SaleDetail)
    private readonly engineRepository: Repository<SaleDetail>
  ) {
    super(engineRepository)

    this.modelClass = SaleDetail
  }
}
