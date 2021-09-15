import { BaseSortFields, SortField } from "@merlin-gql/core";
import { Field, InputType } from "type-graphql";
import { UserSorts } from "../user/user.sort";

@InputType()
export class PersonSorts extends BaseSortFields {
    @Field((_) => SortField, { nullable: true })
    id?: SortField;

    @Field((_) => SortField, { nullable: true })
    name?: SortField;

    @Field((_) => SortField, { nullable: true })
    age?: SortField;

    @Field((_) => UserSorts, { nullable: true })
    user?: UserSorts;
}
