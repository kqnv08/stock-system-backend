import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm"
import { ObjectType, Field, ID, Float, ResolveField } from "@nestjs/graphql"

import { BaseModel } from "src/core/lib"
import { SaleDetail } from "../../sale-detail/entities/sale-detail.entity"
import { Expose } from "class-transformer"

@ObjectType()
@Entity({
  name: "stock_sale",
})
export class Sale extends BaseModel {
  @Field(() => ID, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  name?: string

  @Field(() => [SaleDetail], { nullable: false })
  @OneToMany(() => SaleDetail, (saleDetail) => saleDetail.sale, { lazy: true })
  details: Promise<Array<SaleDetail>>

  @Field(() => Date, { nullable: true })
  @CreateDateColumn({ type: "timestamp" })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ type: "timestamp", default: null })
  updatedAt?: Date

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn({ type: "timestamp", default: null })
  deletedAt?: Date


  @Field(() => Float, { nullable: true })
  total?: number;
}
