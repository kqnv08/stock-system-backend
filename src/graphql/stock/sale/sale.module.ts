import { Module, forwardRef } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { SaleService } from "./sale.service"
import { SaleResolver } from "./sale.resolver"

import { Sale } from "./entities/sale.entity"
import { SaleDetailService } from "../sale-detail/sale-detail.service"
import { SaleDetailModule } from "../sale-detail/sale-detail.module"

@Module({
  imports: [TypeOrmModule.forFeature([Sale]),
  forwardRef(() => SaleDetailModule)
  ],
  providers: [SaleResolver, SaleService],
  exports: [SaleResolver, SaleService],
})
export class SaleModule { }
