import { BaseInputFields } from "@merlin-gql/core";
import { Field, InputType, Int } from "type-graphql";
import { Person } from "../../models/person/person.model";

@InputType()
export class PersonCreateInput extends BaseInputFields implements Partial<Person> {
    @Field((_) => String)
    name: string = "";

    @Field((_) => Int)
    age: number = 0;

    @Field((_) => Date, { nullable: true })
    deletedDate?: Date;
}

@InputType()
export class PersonUpdateInput extends BaseInputFields implements Partial<Person> {
    @Field((_) => String, { nullable: true })
    name?: string;

    @Field((_) => Int, { nullable: true })
    age?: number;

    @Field((_) => Date, { nullable: true })
    deletedDate?: Date;
}
