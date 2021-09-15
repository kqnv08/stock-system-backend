import { BaseModel } from "@merlin-gql/core";
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Store extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column("varchar")
  name: string = "";

  @Column("varchar")
  address: string = "";

  @DeleteDateColumn()
  deletedDate: Date | null = null;

}
