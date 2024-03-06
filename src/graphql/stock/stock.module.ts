import { Module } from "@nestjs/common"

import { BrandModule } from "./brand/brand.module"
import { CategoryModule } from "./category/category.module"
import { ProductModule } from "./product/product.module"
import { SaleModule } from "./sale/sale.module"
import { SaleDetailModule } from "./sale-detail/sale-detail.module"

@Module({
  imports: [BrandModule, CategoryModule, ProductModule, SaleModule, SaleDetailModule],
})
export class StockModule {}
