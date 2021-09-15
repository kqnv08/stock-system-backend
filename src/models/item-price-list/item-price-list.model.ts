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
import { Item } from "../item/item.model";
import { PriceList } from "../price-list/price-list.model";
import { SaleDetail } from "../sale-detail/sale-detail.model";

@Entity()
export class ItemPriceList extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column("int", { name: "item_id", nullable: true })
  itemId: number | null = null;

  @ManyToOne(() => Item, (item) => item.itemPriceList, { lazy: true })
  @JoinColumn([{ name: "item_id", referencedColumnName: "id" }])
  item?: Promise<Item>;

  @Column("int", { name: "price_list_id", nullable: true })
  priceListId: number | null = null;

  @ManyToOne(() => PriceList, (item) => item.ItemPriceList, { lazy: true })
  @JoinColumn([{ name: "price_list_id", referencedColumnName: "id" }])
  priceList?: Promise<Item>;

  @DeleteDateColumn()
  deletedDate: Date | null = null;

  @CreateDateColumn({ nullable: true })
  created?: Date;

  @OneToMany(() => SaleDetail, (saleDetail) => saleDetail.itemPriceList, {
    lazy: true,
  })
  saleDetails?: Promise<Array<SaleDetail>>;
}
