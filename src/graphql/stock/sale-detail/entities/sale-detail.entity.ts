import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { ObjectType, Field, ID, Float, Int } from "@nestjs/graphql"

import { BaseModel } from "src/core/lib"
import { Sale } from "../../sale/entities/sale.entity"
import { Product } from "../../product/entities/product.entity"
import { Expose } from "class-transformer"

@ObjectType()
@Entity({
  name: "stock_sale_detail",
})
export class SaleDetail extends BaseModel {
  @Field(() => ID, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => Float, { nullable: true })
  @Column({ type: "double precision" })
  price: number

  @Field(() => Int, { nullable: true })
  @Column({ type: "int" })
  quantity: number

  @Field(() => String, { nullable: true })
  @Column("int", { nullable: true })
  saleId?: number
  @Field(() => Sale, { nullable: true })
  @ManyToOne(() => Sale, (sale) => sale.details, { lazy: true })
  @JoinColumn({ name: "sale_id" })
  sale?: Promise<Sale>

  @Field(() => String, { nullable: true })
  @Column("int", { nullable: true })
  productId?: number
  @Field(() => Product, { nullable: true })
  @ManyToOne(() => Product, { lazy: true })
  @JoinColumn({ name: "product_id" })
  product?: Promise<Product>

  @Field(() => Date, { nullable: true })
  @CreateDateColumn({ type: "timestamp" })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ type: "timestamp", default: null })
  updatedAt?: Date

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn({ type: "timestamp", default: null })
  deletedAt?: Date

  @Expose()
  @Field(() => Float, { nullable: true })
  get total(): number {
    return this.quantity * this.price
  }
}
