import { BaseModel } from "@merlin-gql/core";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ItemPriceList } from "../item-price-list/item-price-list.model";
import { Sale } from "../sale/sale.model";

@Entity()
export class SaleDetail extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @DeleteDateColumn()
  deletedDate: Date | null = null;

  @CreateDateColumn()
  created?:Date;

  @Column("int", { name: "item_price_list_id", nullable: true })
  itemPriceListId: number | null = null;

  @ManyToOne(()=>ItemPriceList,(itemPrinceList) => itemPrinceList.saleDetails, { lazy: true })
  @JoinColumn([{ name: "item_price_list_id", referencedColumnName: "id" }])
  itemPriceList?:Promise<ItemPriceList>;

  @Column("int", { name: "sale_id", nullable: true })
  saleId: number | null = null;

  @ManyToOne(()=>Sale,(sale) => sale.saleDetails, { lazy: true })
  @JoinColumn([{ name: "sale_id", referencedColumnName: "id" }])
  sale?:Promise<Sale>;
}
