import { gql } from "@apollo/client";

export const GET_USER_INFO = gql`
  query GetUserInfo {
    getUserInfo {
      isLoggedIn
      email
      firstname
      lastname
      birthdate
      gender
      phone
      avatar
    }
  }
`;

export const GET_CARPOOL_BY_ID = gql`
  query GetCarpoolById($getCarpoolByIdId: Float!) {
    getCarpoolById(id: $getCarpoolByIdId) {
      id
      departure_date
      departure_time
      departure_city
      arrival_city
      num_passenger
      toll
      duration
      price
      options
      driver {
        firstname
        id
        avatar
      }
      bookings {
        numPassenger
        passenger {
          id
          firstname
          avatar
        }
      }
    }
  }
`;

export const SEARCH_CARPOOLS = gql`
  query SearchCarpools(
    $departure: String!
    $arrival: String!
    $date: String!
    $time: String!
  ) {
    searchCarpools(
      departure: $departure
      arrival: $arrival
      date: $date
      time: $time
    ) {
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

export const GET_CITIES = gql`
  query GetCities {
    getCities {
      id
      name
    }
  }
`;
