import { BaseModel } from "@merlin-gql/core";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SaleDetail } from "../sale-detail/sale-detail.model";

@Entity()
export class Sale extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @DeleteDateColumn()
  deletedDate: Date | null = null;

  @CreateDateColumn()
  created?:Date;

  @OneToMany(() => SaleDetail, (saleDetail) => saleDetail.itemPriceList, {
    lazy: true,
  })
  saleDetails?: Promise<Array<SaleDetail>>;
}
