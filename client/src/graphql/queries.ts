import { gql } from 'apollo-boost';

export const GET_USER = gql`
  query {
    currentUser {
      _id
      display_name
      google_id
    }
  }
`;
