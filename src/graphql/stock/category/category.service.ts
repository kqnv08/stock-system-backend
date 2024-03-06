import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { BaseService } from "src/core/lib"

import { Category } from "./entities/category.entity"

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly engineRepository: Repository<Category>
  ) {
    super(engineRepository)

    this.modelClass = Category
  }
}
