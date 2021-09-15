import { MerlinGQLField, MerlinGQLResolver, NoSort } from "@merlin-gql/core";
import { Float, ID } from "type-graphql";
import { Item } from "../item/item.model";
import { PriceList } from "../price-list/price-list.model";
import { SaleDetail } from "../sale-detail/sale-detail.model";
import { ItemPriceList } from "./item-price-list.model";

@MerlinGQLResolver([
  { type: "FIND", secure: false },
  { type: "LIST", secure: false },
  "CREATE",
  "UPDATE",
  "DELETE",
])
export class ItemPriceListResolverGenerator extends ItemPriceList {
  @MerlinGQLField((_) => ID)
  id!: number;

  @MerlinGQLField((_) => String)
  name!: string;

  @MerlinGQLField((_) => Date, { nullable: true })
  @NoSort()
  deletedDate!: Date;

  @MerlinGQLField((_) => Date, { nullable: true })
  created?: Date;

  @MerlinGQLField((_) => Item, { nullable: true })
  item?: Promise<Item>;

  @MerlinGQLField((_) => Float)
  itemId!: number;

  @MerlinGQLField((_) => PriceList, { nullable: true })
  priceList?: Promise<Item>;

  @MerlinGQLField((_) => Float, { nullable: true })
  priceListId!: number;

  @MerlinGQLField(() => [SaleDetail], { nullable: true })
  saleDetails?: Promise<Array<SaleDetail>>;
}
