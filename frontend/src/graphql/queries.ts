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
      driver {
        firstname
        lastname
      }
    }
  }
`;

export const SEARCH_CARPOOLS = gql`
  query SearchCarpools($departure: String!, $arrival: String!, $date: String!) {
    searchCarpools(departure: $departure, arrival: $arrival, date: $date) {
      id
      departure_city
      arrival_city
      departure_date
      departure_time
      num_passenger
      price
      driver {
        firstname
        lastname
      }
    }
  }
`;
