import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { BaseService } from "src/core/lib"

import { Product } from "./entities/product.entity"

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly engineRepository: Repository<Product>
  ) {
    super(engineRepository)

    this.modelClass = Product
  }

}
