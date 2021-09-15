import { MerlinGQLField, MerlinGQLResolver, NoSort } from "@merlin-gql/core";
import { Float, ID } from "type-graphql";
import { ItemPriceList } from "../item-price-list/item-price-list.model";
import { Sale } from "../sale/sale.model";
import { SaleDetail } from "./sale-detail.model";

@MerlinGQLResolver([
  { type: "FIND", secure: false },
  { type: "LIST", secure: false },
  "CREATE",
  "UPDATE",
  "DELETE",
])
export class SaleDetailResolverGenerator extends SaleDetail {
  @MerlinGQLField((_) => ID)
  id!: number;

  @MerlinGQLField((_) => Date, { nullable: true })
  @NoSort()
  deletedDate!: Date;

  @MerlinGQLField(() => Date, { nullable: true })
  created?: Date;

  @MerlinGQLField((_) => ItemPriceList, { nullable: true })
  itemPriceList?: Promise<ItemPriceList>;

  @MerlinGQLField((_) => Float, { nullable: true })
  itemPriceListId!: number;

  @MerlinGQLField((_) => Sale, { nullable: true })
  sale?: Promise<Sale>;

  @MerlinGQLField((_) => Float, { nullable: true })
  saleId!: number;
}
