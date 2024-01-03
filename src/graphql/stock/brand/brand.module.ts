import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { BrandService } from "./brand.service"
import { BrandResolver } from "./brand.resolver"

import { Brand } from "./entities/brand.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  providers: [BrandResolver, BrandService],
  exports: [BrandResolver, BrandService],
})
export class BrandModule { }
