import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"
import { ObjectType, Field, ID } from "@nestjs/graphql"

import { BaseModel } from "src/core/lib"

@ObjectType()
@Entity({
  name: "stock_products",
})
export class Product extends BaseModel {
  @Field(() => ID, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => String)
  @Column()
  name: string

  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  description?: string

  @Field(() => Boolean, { nullable: true })
  @Column({ default: true })
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
}
