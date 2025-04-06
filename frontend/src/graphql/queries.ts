import { gql } from "@apollo/client";

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

export const GET_CARPOOLS_BY_USER_ID = gql`
  query GetCarpoolsByUserId($userId: Float!) {
    getCarpoolsByUserId(userId: $userId) {
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
  