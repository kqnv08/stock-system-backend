import { BaseFilterFields, FilteredDate, FilteredID, FilteredInt, FilteredString } from "@merlin-gql/core";
import { Field, InputType } from "type-graphql";
import { UserFilters } from "../user/user.filter";

@InputType()
export class PersonFilters extends BaseFilterFields {
    @Field((_) => [PersonFilters], { nullable: true })
    or?: PersonFilters[];

    @Field((_) => [PersonFilters], { nullable: true })
    and?: PersonFilters[];

    @Field((_) => FilteredID, { nullable: true })
    id?: number;

    @Field((_) => FilteredString, { nullable: true })
    name?: string;

    @Field((_) => FilteredInt, { nullable: true })
    age?: number;

    @Field((_) => FilteredDate, { nullable: true })
    deletedDate?: Date;

    @Field((_) => UserFilters, { nullable: true })
    user?: UserFilters;
}
