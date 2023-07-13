import { Module } from "@nestjs/common"

import { SysModule } from "./sys/sys.module"
import { StockModule } from "./stock/stock.module"

@Module({
  imports: [
    SysModule,
    StockModule
  ],
})
export class HQLModule { }
