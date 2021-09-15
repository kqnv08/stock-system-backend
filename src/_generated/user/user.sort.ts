import { BaseSortFields, SortField } from "@merlin-gql/core";
import { Field, InputType } from "type-graphql";
import { PersonSorts } from "../person/person.sort";

@InputType()
export class UserSorts extends BaseSortFields {
    @Field((_) => SortField, { nullable: true })
    id?: SortField;

    @Field((_) => SortField, { nullable: true })
    username?: SortField;

    @Field((_) => SortField, { nullable: true })
    password?: SortField;

    @Field((_) => SortField, { nullable: true })
    email?: SortField;

    @Field((_) => SortField, { nullable: true })
    role?: SortField;

    @Field((_) => SortField, { nullable: true })
    deletedDate?: SortField;

    @Field((_) => PersonSorts, { nullable: true })
    person?: PersonSorts;
}
