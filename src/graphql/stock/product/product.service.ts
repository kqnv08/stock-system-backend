import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import * as ExcelJS from 'exceljs';
import { BaseService } from "src/core/lib"
import * as path from 'path';
import { Product } from "./entities/product.entity"
import { GenericResult } from "src/core/lib/interfaces/generic-result.interface"

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly engineRepository: Repository<Product>
  ) {
    super(engineRepository)

    this.modelClass = Product
  }

  async loadProduct(): Promise<GenericResult> {
    try {
      const filePath = path.resolve(__dirname, '../../../public/precios.xlsx');

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);

      const worksheet = workbook.worksheets[0];

      const products: Product[] = [];

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber >2) {;
          this.engineRepository.save({ name: row.values[1], code: row.values[2], price: row.values[3] ??0 })
        }
      });

      return { success: true }
    } catch (error) {
      console.log(error)
    }
  }

}
