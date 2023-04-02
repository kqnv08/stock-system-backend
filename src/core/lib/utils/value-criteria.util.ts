import { FilterTypeValue } from "../tables/filter.table"
import * as moment from "moment"

export const setValueCriteria = (value: any, type: string) => {
  switch (type) {
    case FilterTypeValue.NUMBER:
      return Number(value)
    case FilterTypeValue.BOOLEAN:
      return value === 'true' ? 1 : 0
    case FilterTypeValue.DATE:
      return moment(value).format("YYYY/MM/DD HH:mm").toString()
    default:
      return value?.toString()
  }
}

export const getInValue = (filterValue: any): string => {

  let values: string

  const parsedValues = JSON.parse(filterValue as string)
  parsedValues.forEach((el, i) => {
    values = (i == 0) ? `${el}` : `${values},${el}`
  })

  return values
}
