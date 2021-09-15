import { MerlinGQLField, MerlinGQLResolver, NoSort } from "@merlin-gql/core";
import { Float, ID } from "type-graphql";
import { ItemPriceList } from "../item-price-list/item-price-list.model";
import { User } from "../user/user.model";
import { Item } from "./item.model";

@MerlinGQLResolver([
  { type: "FIND", secure: false },
  { type: "LIST", secure: false },
  "CREATE",
  "UPDATE",
  "DELETE",
])
export class ItemResolverGenerator extends Item {
  @MerlinGQLField((_) => ID)
  id!: number;

  @MerlinGQLField((_) => String)
  name!: string;

  @MerlinGQLField((_) => String)
  code!: string;

  @MerlinGQLField((_) => Date, { nullable: true })
  @NoSort()
  deletedDate!: Date;

  @MerlinGQLField((_) => Float, { nullable: true })
  stock?: number;

  @MerlinGQLField(() => [ItemPriceList], { nullable: true })
  itemPriceList?: Promise<Array<ItemPriceList>>;
}
