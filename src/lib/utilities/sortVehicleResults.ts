import { IBikeCard, ICarCard, IScooterCard } from '@/compiler/interfaces'

const sortAlphabeticallyAsc = (a: string, b: string) => {
  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }
  return 0
}
const sortAlphabeticallyDesc = (a: string, b: string) => {
  if (a < b) {
    return 1
  }
  if (a > b) {
    return -1
  }
  return 0
}

const sortNumericallyAsc = (a: number, b: number) => a - b
const sortNumericallyDesc = (a: number, b: number) => b - a

const getColumnAndOrder = (sortValues: string) => sortValues.split('-')

export const sortVehicleResults = (
  results: ICarCard[] | IBikeCard[] | IScooterCard[],
  sortValues: string,
  isCar: boolean
) => {
  const [sortColumn, sortOrder] = getColumnAndOrder(sortValues)
  switch (sortColumn) {
    case 'name':
      if (sortOrder === 'asc') {
        return results.sort((a, b) =>
          isCar
            ? sortAlphabeticallyAsc(
                `${(a as ICarCard).brand} ${a.name}`,
                `${(b as ICarCard).brand} ${b.name}`
              )
            : sortAlphabeticallyAsc(a.name, b.name)
        )
      } else if (sortOrder === 'desc') {
        return results.sort((a, b) =>
          isCar
            ? sortAlphabeticallyDesc(
                `${(a as ICarCard).brand} ${a.name}`,
                `${(b as ICarCard).brand} ${b.name}`
              )
            : sortAlphabeticallyDesc(a.name, b.name)
        )
      }
      break
    case 'price_per_day':
      if (sortOrder === 'asc') {
        return results.sort((a, b) =>
          sortNumericallyAsc(a.price_per_day, b.price_per_day)
        )
      } else if (sortOrder === 'desc') {
        return results.sort((a, b) =>
          sortNumericallyDesc(a.price_per_day, b.price_per_day)
        )
      }
      break
    default:
      return results
  }
}
