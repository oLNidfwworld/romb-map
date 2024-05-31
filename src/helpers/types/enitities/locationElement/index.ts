import type { CityElement } from '../cityElement'

export type LocationElement = {
  id: string
  name: string | undefined
  properties: LocationProperties
  city: CityElement
}

type LocationProperties = {
  phone: string | undefined
  adress: string | undefined
  mapPlacemark: string | undefined
}
