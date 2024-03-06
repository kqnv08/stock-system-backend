import { Brackets, SelectQueryBuilder } from "typeorm"
import { BetweenValue, FilterTypesEnum, FilterTypeValue, IFilterCriterion, } from "../tables/filter.table"
import { FilterCriteriaInfo } from "../tables/criteria.table"
import { getInValue, setValueCriteria } from "./value-criteria.util"

export function queryBuilderCriteria<T>(queryBuilder: SelectQueryBuilder<T>, criteria: FilterCriteriaInfo, additionalFilters?: IFilterCriterion) {

  const innerJointEntities: Array<string> = []

  let countFilter = 0
  const generateBracket = (filter: IFilterCriterion): Brackets => {
    const bracket = new Brackets(newQueryBuilder => {
      countFilter++
      switch (filter.type) {
        case FilterTypesEnum.And:
          filter.filters?.forEach(criterion => {
            const newBracket = generateBracket(criterion)
            newQueryBuilder.andWhere(newBracket)
          })
          break;
        case FilterTypesEnum.Or:
          filter.filters?.forEach(criterion => {
            const newBracket = generateBracket(criterion)
            newQueryBuilder.orWhere(newBracket)
          })
          break;

        default:

          const arrayChain = filter.property?.split(".")
          for (let i = 0; i < arrayChain?.length - 1; i++) {
            const existAlias: boolean = innerJointEntities.indexOf(arrayChain[i]) != -1
            if (!existAlias) {
              if (i == 0) {
                queryBuilder.innerJoinAndSelect(`c.${arrayChain[i]}`, `${arrayChain[i]}`)
              } else {
                queryBuilder.innerJoinAndSelect(`${arrayChain[i - 1]}.${arrayChain[i]}`, `${arrayChain[i]}`)
              }
              innerJointEntities.push(arrayChain[i])
            }
          }

          const alias = arrayChain.length <= 1 ? "c" : arrayChain[arrayChain.length - 2]
          const propertyAlias = filter.property + countFilter.toString()
          let filterValue: any = setValueCriteria(filter.value, filter.typeValue)

          let queryCustom = ""

          switch (filter.type) {

            case FilterTypesEnum.Equals:
              queryCustom = `${alias}.${arrayChain[arrayChain.length - 1]} = :${propertyAlias}`
              break
            case FilterTypesEnum.EqualsBoolean:
              queryCustom = `${alias}.${arrayChain[arrayChain.length - 1]} = :${propertyAlias}`
              break
            case FilterTypesEnum.NotEquals:
              queryCustom = `${alias}.${arrayChain[arrayChain.length - 1]} != :${propertyAlias}`
              break
            case FilterTypesEnum.GreatherThan:
              queryCustom = `${alias}.${arrayChain[arrayChain.length - 1]} > :${propertyAlias}`
              break
            case FilterTypesEnum.GreatherThanEquals:
              queryCustom = `${alias}.${arrayChain[arrayChain.length - 1]} >= :${propertyAlias}`
              break

            case FilterTypesEnum.LowerThan:
              queryCustom = `${alias}.${arrayChain[arrayChain.length - 1]} < :${propertyAlias}`
              break

            case FilterTypesEnum.LowerThanEquals:
              queryCustom = `${alias}.${arrayChain[arrayChain.length - 1]} <= :${propertyAlias}`
              break
            case FilterTypesEnum.Like:
              queryCustom = `LOWER(${alias}.${arrayChain[arrayChain.length - 1]}) like LOWER(:${propertyAlias})`
              filterValue = `%${filterValue}%`
              break
            // break
            case FilterTypesEnum.In:
              queryCustom = `${alias}.${arrayChain[arrayChain.length - 1]} IN(${propertyAlias})`
              filterValue = getInValue(filter.value)
              break
            case FilterTypesEnum.IsNull:
              queryCustom = `${alias}.${arrayChain[arrayChain.length - 1]} is null`

              break
            case FilterTypesEnum.IsNotNull:
              queryCustom = `${alias}.${arrayChain[arrayChain.length - 1]} is not null`

              break

          }
          newQueryBuilder.andWhere(queryCustom, filterValue || filterValue == 0 ? {
            [propertyAlias]: filterValue,
          } : null)

          break;
      }

    })

    return bracket
  }

  if (criteria.filter?.type) {
    const newBracket = generateBracket(criteria.filter)
    queryBuilder.where(newBracket)
  }

  if (additionalFilters) {
    const newBracket = generateBracket(additionalFilters)
    queryBuilder.andWhere(newBracket)
  }



  if (criteria.sort) {
    const arrayChain = [...criteria.sort.column.split(".")]
    for (let i = 0; i < arrayChain.length - 1; i++) {
      if (!innerJointEntities.find(filter => arrayChain[i] == filter)) {
        if (i == 0) {
          queryBuilder.innerJoinAndSelect(`c.${arrayChain[i]}`, `${arrayChain[i]}`)
        } else {
          queryBuilder.innerJoinAndSelect(`${arrayChain[i - 1]}.${arrayChain[i]}`, `${arrayChain[i]}`)
        }
        innerJointEntities.push(arrayChain[i])
      }
    }
    const alias = arrayChain.length == 1 ? "c" : arrayChain[arrayChain.length - 2]
    queryBuilder.orderBy(`${alias}.${arrayChain[arrayChain.length - 1]}`, <"ASC" | "DESC">criteria.sort.order)
  } else {
    queryBuilder.orderBy("c.created_at", "DESC") // default sort
  }

  return queryBuilder
}
