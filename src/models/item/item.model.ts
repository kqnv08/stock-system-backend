import { BaseModel } from "@merlin-gql/core";
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ItemPriceList } from "../item-price-list/item-price-list.model";

@Entity()
export class Item extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column("varchar")
  name: string = "";

  @Column("varchar")
  code: string = "";

  @DeleteDateColumn()
  deletedDate: Date | null = null;

  @Column("int", { nullable: true })
  stock?: number = 0;

  @OneToMany(() => ItemPriceList, (itemPriceList) => itemPriceList.item, {
    lazy: true,
  })
  itemPriceList?: Promise<Array<ItemPriceList>>;
}
