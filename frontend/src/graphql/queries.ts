import { gql } from "@apollo/client";

export const GET_CARPOOL_BY_ID = gql`
  query GetCarpoolById($getCarpoolByIdId: Float!) {
    getCarpoolById(id: $getCarpoolByIdId) {
      arrival_city
      departure_city
      departure_date
      departure_time
      num_passenger
      options
      price
      type_of_road
    }
  }
`;