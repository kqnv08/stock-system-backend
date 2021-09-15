import { BaseModel } from "@merlin-gql/core";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../category/category.model";

@Entity()
export class Product extends BaseModel {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column("varchar", { nullable: true })
    name: string | null = null;

    @Column("double")
    price: number = 0;

    @ManyToOne((_) => Category, "products")
    @JoinColumn({ name: "category_id" })
    category?: Promise<Category>;

    @Column("int", { nullable: true })
    categoryId: number | null = null;
}
