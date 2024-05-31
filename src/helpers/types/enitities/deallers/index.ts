import type { CityElement } from '../cityElement'
import type { LocationElement } from '../locationElement'

export type Deallers = {
  deallers: {
    elements: LocationElement[]
    cities: CityElement[]
  }
}
