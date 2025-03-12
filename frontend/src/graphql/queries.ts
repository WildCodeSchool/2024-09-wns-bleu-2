import { gql } from "@apollo/client";

export const GET_CARPOOLS_BY_USER_ID = gql`
  query GetCarpoolsByUserId($userId: Float!) {
    getCarpoolsByUserId(userId: $userId) {
      id
      departure_date
      departure_time
      arrival_city
      num_passenger
      type_of_road
      duration
      price
      options
      driver {
        firstname
        lastname
        avatar
      }
    }
  }
`;
  