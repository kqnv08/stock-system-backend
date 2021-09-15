import { MerlinGQLField, MerlinGQLResolver, NoSort } from "@merlin-gql/core";
import { Float, ID } from "type-graphql";
import { SaleDetail } from "../sale-detail/sale-detail.model";
import { Sale } from "./sale.model";

@MerlinGQLResolver([
  { type: "FIND", secure: false },
  { type: "LIST", secure: false },
  "CREATE",
  "UPDATE",
  "DELETE",
])
export class SaleResolverGenerator extends Sale {
  @MerlinGQLField((_) => ID)
  id!: number;

  @MerlinGQLField((_) => Date, { nullable: true })
  @NoSort()
  deletedDate!: Date;

  @MerlinGQLField(() => Date, { nullable: true })
  created?: Date;

  @MerlinGQLField(() => [SaleDetail], { nullable: true })
  saleDetails?: Promise<Array<SaleDetail>>;
}
