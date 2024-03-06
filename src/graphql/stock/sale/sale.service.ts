import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { QueryRunner, Repository } from "typeorm"

import { BaseService } from "src/core/lib"

import { Sale } from "./entities/sale.entity"
import { GenericResult } from "src/core/lib/interfaces/generic-result.interface"
import { NewSaleInputDto } from "./dto/sale.dto"
import { SaleDetailService } from "../sale-detail/sale-detail.service"

@Injectable()
export class SaleService extends BaseService<Sale> {
  constructor(
    @InjectRepository(Sale)
    private readonly engineRepository: Repository<Sale>,
    private readonly saleDetailRepository: SaleDetailService
  ) {
    super(engineRepository)

    this.modelClass = Sale
  }

  async createSale(data: NewSaleInputDto, connect?: QueryRunner): Promise<GenericResult> {
    try {
      const newSale = await this.engineRepository.save({})
      
      data.saleDetails.forEach(async saleDetail => {
        saleDetail.saleId = newSale.id.toString()
        await this.saleDetailRepository.create(saleDetail)
      });


      return { success: true }
    } catch (error) {
      return { success: false }
    }
  }
}
