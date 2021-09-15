import { MerlinGQLField, MerlinGQLResolver, NoSort } from "@merlin-gql/core";
import { Float, ID } from "type-graphql";
import { User } from "../user/user.model";
import { Store } from "./store.model";

@MerlinGQLResolver([
  { type: "FIND", secure: false },
  { type: "LIST", secure: false },
  "CREATE",
  "UPDATE",
  "DELETE",
])
export class StoreResolverGenerator extends Store {
  @MerlinGQLField((_) => ID)
  id!: number;

  @MerlinGQLField((_) => String)
  name!: string;

  @MerlinGQLField((_) => String)
  address!: string;

  @MerlinGQLField((_) => Date, { nullable: true })
  @NoSort()
  deletedDate!: Date;
}
