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
        driver {
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
        driver {
          id
          firstname
          avatar
        }
      }
    }
  }
`;

export const GET_BOOKINGS_BY_USER_ID = gql`
  query GetBookingsByUserId($userId: Float!) {
    getBookingsByUserId(userId: $userId) {
      id
      numPassenger
      reservedAt
      carpool {
        id
        arrival_city
        departure_city
        departure_date
        departure_time
        duration
        num_passenger
        options
        price
        toll
      }
      driver {
        id
        avatar
        birthdate
        car {
          brand
          color
          model
          year
        }
        email
        firstname
        gender
        lastname
        phone
      }
    }
  }
`;