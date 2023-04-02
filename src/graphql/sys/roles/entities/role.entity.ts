import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BaseModel } from "src/core/lib";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@ObjectType()
@Entity({ name: "sys_roles" })

export class Role extends BaseModel {
  @Field(() => ID, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => String, { nullable: false })
  @Column("varchar")
  name: string

  // @Field(() => [User], { nullable: false })
  // @ManyToMany(() => User, (user) => user.roles, { lazy: true })
  // users: Promise<User[]>
  @Field(() => [User], { nullable: false })
  @OneToMany(() => User, (user) => user.role, { lazy: true })
  users: Promise<User[]>

  @Field(() => Date, { nullable: true })
  @CreateDateColumn({ type: "timestamp" })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt?: Date

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn({ type: "timestamp", default: null })
  deletedAt?: Date

}
