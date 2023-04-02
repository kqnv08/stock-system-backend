import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BaseModel } from "src/core/lib";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'sys_user_register_tokens' })
@ObjectType()

export class UserRegisterToken extends BaseModel {
  @Field(() => ID, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => String, { nullable: false })
  @Column()
  email: string

  @Field(() => String, { nullable: false })
  @Column({ unique: true })
  token: string

  @Field(() => Date, { nullable: false })
  @Column({ type: "timestamp" })
  expirationDate: Date

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
