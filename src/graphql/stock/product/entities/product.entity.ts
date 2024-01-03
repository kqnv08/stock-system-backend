import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { ObjectType, Field, ID, Float } from "@nestjs/graphql"

import { BaseModel } from "src/core/lib"
import { Brand } from "../../brand/entities/brand.entity"

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

  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  code?: string

  @Field(() => Float, { nullable: true })
  @Column({ type: "numeric", nullable: true })
  price?: number

  @Field(() => String, { nullable: true })
  @Column("int", { nullable: true })
  brandId?: number
  @Field(() => Brand, { nullable: true })
  @ManyToOne(() => Brand, { lazy: true })
  @JoinColumn({ name: "brand_id" })
  brand?: Promise<Brand>

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
