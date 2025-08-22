import { gql } from '@apollo/client';

export const GET_BIRDS = gql`
  query GetBirds {
    birds {
      id
      thumb_url
      english_name
      latin_name
    }
  }
`
