import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsOptional } from "class-validator"

export enum FilterTypesEnum {
  GreatherThan = "gt",
  GreatherThanEquals = "gte",
  LowerThan = "lt",
  LowerThanEquals = "lte",
  Like = "like",
  Equals = "eq",
  EqualsBoolean = "eqb",
  NotEquals = "neq",
  Between = "between",
  In = "in",
  IsNull = "is_null",
  IsNotNull = "is_not_null",
  And = "and",
  Or = "or"
}

export enum FilterTypeValue {
  NUMBER = "number",
  STRING = "string",
  BOOLEAN = "bool",
  DATE = "date",
  DATETIME = "datetime"
}

@InputType()
export class BetweenValue {
  @Field(() => String || Number || Date, { nullable: true })
  from?: string | number | Date
  @Field(() => String || Number || Date, { nullable: true })
  to?: string | number | Date
}

@InputType()
export class IFilterCriterion {
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  type?: string

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  property?: string

  @Field(() => String, { nullable: true })
  @IsOptional()
  typeValue?: string

  @Field(() => String, { nullable: true })
  @IsOptional()
  value?: string | number | boolean

  @Field(() => [IFilterCriterion], { nullable: true })
  @IsOptional()
  filters?: Array<IFilterCriterion>
}

@InputType()
export class ISortCriteria {
  @Field()
  column: string
  @Field()
  order: string
}
