import { BaseModel } from "@merlin-gql/core";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ItemPriceList } from "../item-price-list/item-price-list.model";

@Entity()
export class PriceList extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column("varchar")
  name: string = "";

  @DeleteDateColumn()
  deletedDate: Date | null = null;

  @CreateDateColumn({ nullable: true })
  created?: Date;

  @OneToMany(
    () => ItemPriceList,
    (ItemPriceList) => ItemPriceList.priceList,
    { lazy: true }
  )
  ItemPriceList?: Promise<Array<ItemPriceList>>;
}
