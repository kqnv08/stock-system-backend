import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { SaleDetailService } from "./sale-detail.service"
import { SaleDetailResolver } from "./sale-detail.resolver"

import { SaleDetail } from "./entities/sale-detail.entity"

@Module({
  imports: [TypeOrmModule.forFeature([SaleDetail])],
  providers: [SaleDetailResolver, SaleDetailService],
  exports: [SaleDetailResolver, SaleDetailService],
})
export class SaleDetailModule {}
