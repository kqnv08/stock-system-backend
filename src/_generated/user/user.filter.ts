import { BaseFilterFields, FilteredDate, FilteredID, FilteredString } from "@merlin-gql/core";
import { Field, InputType } from "type-graphql";
import { PersonFilters } from "../person/person.filter";

@InputType()
export class UserFilters extends BaseFilterFields {
    @Field((_) => [UserFilters], { nullable: true })
    or?: UserFilters[];

    @Field((_) => [UserFilters], { nullable: true })
    and?: UserFilters[];

    @Field((_) => FilteredID, { nullable: true })
    id?: number;

    @Field((_) => FilteredString, { nullable: true })
    username?: string;

    @Field((_) => FilteredString, { nullable: true })
    password?: string;

    @Field((_) => FilteredString, { nullable: true })
    email?: string;

    @Field((_) => FilteredString, { nullable: true })
    role?: string;

    @Field((_) => FilteredDate, { nullable: true })
    deletedDate?: Date;

    @Field((_) => PersonFilters, { nullable: true })
    person?: PersonFilters;
}
