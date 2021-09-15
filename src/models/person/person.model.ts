import { BaseModel } from "@merlin-gql/core";
import { Column, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.model";

@Entity()
export class Person extends BaseModel {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column("varchar")
    name: string = "";

    @Column("int")
    age: number = 0;

    @DeleteDateColumn()
    deletedDate: Date | null = null;

    @OneToOne(() => User, (user) => user.person)
    @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
    user?: Promise<User>;
}
