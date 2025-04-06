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

export const GET_BOOKINGS_FOR_PASSENGER = gql`
  query getBookingsForPassenger($passengerId: Float!) {
    getBookingsForPassenger(passengerId: $passengerId) {
     carpool {
      arrival_city
      departure_city
      departure_date
      departure_time
      driver {
        avatar
        birthdate
        car {
          brand
          color
          id
          model
          year
        }
        email
        firstname
        gender
        id
        lastname
        phone
      }
      duration
      id
      num_passenger
      price
      toll
      options
    }
    id
    numPassenger
    passenger {
      avatar
      birthdate
      car {
        brand
        color
        id
        model
        year
      }
      email
      firstname
      gender
      lastname
      phone
      id
    }
    reservedAt
  }
  }
`;