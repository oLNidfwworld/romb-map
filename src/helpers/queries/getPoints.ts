import gql from 'graphql-tag'

export const GET_POINTS = gql`
  query {
    iblock {
      deallers {
        elements: getElementList {
          id
          name
          properties {
            phone
            adress
            mapPlacemark
          }
          city: iblockSection {
            id
            name
          }
        }
        cities: getSectionList {
          id
          name
        }
      }
    }
  }
`
