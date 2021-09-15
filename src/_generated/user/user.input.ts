import { BaseInputFields } from "@merlin-gql/core";
import { Field, InputType } from "type-graphql";
import { User } from "../../models/user/user.model";

@InputType()
export class UserCreateInput extends BaseInputFields implements Partial<User> {
    @Field((_) => String)
    username: string = "";

    @Field((_) => String)
    password: string = "";

    @Field((_) => String)
    email: string = "";

    @Field((_) => String)
    role: string = "";

    @Field((_) => Date, { nullable: true })
    deletedDate?: Date;
}

@InputType()
export class UserUpdateInput extends BaseInputFields implements Partial<User> {
    @Field((_) => String, { nullable: true })
    username?: string;

    @Field((_) => String, { nullable: true })
    password?: string;

    @Field((_) => String, { nullable: true })
    email?: string;

    @Field((_) => String, { nullable: true })
    role?: string;

    @Field((_) => Date, { nullable: true })
    deletedDate?: Date;
}
