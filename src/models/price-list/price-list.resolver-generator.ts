import { MerlinGQLField, MerlinGQLResolver, NoSort } from "@merlin-gql/core";
import { ID } from "type-graphql";
import { ItemPriceList } from "../item-price-list/item-price-list.model";
import { PriceList } from "./price-list.model";

@MerlinGQLResolver([
  { type: "FIND", secure: false },
  { type: "LIST", secure: false },
  "CREATE",
  "UPDATE",
  "DELETE",
])
export class PricesListResolverGenerator extends PriceList {
  @MerlinGQLField((_) => ID)
  id!: number;

  @MerlinGQLField((_) => String)
  name!: string;

  @MerlinGQLField((_) => Date, { nullable: true })
  @NoSort()
  deletedDate!: Date;

  @MerlinGQLField((_) => Date, { nullable: true })
  created?: Date;

  @MerlinGQLField(() => [ItemPriceList], { nullable: true })
  itemPriceList?: Promise<Array<ItemPriceList>>;
}
