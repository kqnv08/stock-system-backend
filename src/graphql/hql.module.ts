import { Module } from "@nestjs/common"

import { StockModule } from "./stock/stock.module"
import { SysModule } from "./sys/sys.module"

@Module({
  imports: [StockModule, SysModule],
})
export class HQLModule {}
