import { BaseModel } from "@merlin-gql/core";
import { registerEnumType } from "type-graphql";
import { Column, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "../person/person.model";

export enum RolesEnum {
    Admin = "admin",
    User = "user",
}

registerEnumType(RolesEnum, {
    name: "Roles",
});

@Entity()
export class User extends BaseModel {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column("varchar")
    username: string = "";

    @Column("varchar")
    password: string = "";

    @Column("varchar")
    email: string = "";

    @Column("varchar")
    role: string = RolesEnum.User;

    @DeleteDateColumn()
    deletedDate: Date | null = null;

    @OneToOne(() => Person, (person) => person.user)
    person?: Promise<Person>;
}
