import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Expose } from "class-transformer";
import { BaseModel } from "src/core/lib";
// import { Customer } from "src/graphql/cust/customer/entities/customer.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../../roles/entities/role.entity";

@ObjectType()
@Entity({ name: 'sys_users' })

export class User extends BaseModel {
  @Field(() => ID, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => String, { nullable: true })
  @Column("varchar", { nullable: true })
  firstName?: string

  @Field(() => String, { nullable: true })
  @Column("varchar", { nullable: true })
  lastName?: string

  @Field(() => String, { nullable: false })
  @Column({ type: "varchar", unique: true })
  email: string

  @Field(() => String, { nullable: false })
  @Column("varchar")
  password: string

  @Field(() => String, { nullable: false })
  @Column({ type: "int" })
  roleId: number

  @Field(() => Role, { nullable: false })
  @ManyToOne(() => Role, (role) => role.users, { lazy: true })
  @JoinColumn({ name: 'role_id' })
  role: Promise<Role>

  // @Field(() => Customer, { nullable: true })
  // @OneToOne(() => Customer, (customer) => customer.user, { lazy: true })
  // customer?: Promise<Customer>

  @Field(() => Boolean, { nullable: true })
  @Column({ type: "boolean", default: false })
  active: boolean

  @Field(() => Boolean, { nullable: true })
  @Column({ type: "boolean", default: true })
  enabled: boolean

  @Field(() => Date, { nullable: true })
  @CreateDateColumn({ type: "timestamp" })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt?: Date

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn({ type: "timestamp", default: null })
  deletedAt?: Date

  @Expose()
  @Field(() => String, { nullable: true })
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

}
