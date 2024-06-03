import type { CityElement } from '../cityElement'
import type { LngLat } from '@yandex/ymaps3-types'

export type LocationElement = {
  id: string
  name: string | undefined
  properties: LocationProperties
  city: CityElement
}

type LocationProperties = {
  phone: string | undefined
  adress: string | undefined
  mapPlacemark: string | LngLat
}
