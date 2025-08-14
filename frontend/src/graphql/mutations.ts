import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($data: UserInput!) {
    register(data: $data)
  }
`;

export const CONFIRM_EMAIL = gql`
  mutation ConfirmEmail($codeByUser: String!) {
    confirmEmail(codeByUser: $codeByUser)
  }
`;

export const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data)
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile(
    $email: String!
    $firstname: String!
    $lastname: String!
    $phone: String
  ) {
    updateUserProfile(
      email: $email
      firstname: $firstname
      lastname: $lastname
      phone: $phone
    ) {
      email
      firstname
      lastname
      phone
    }
  }
`;

export const DELETE_CARPOOL = gql`
  mutation DeleteCarpool($id: Float!) {
    deleteCarpool(id: $id)
  }
`;

export const CREATE_CARPOOL = gql`
  mutation CreateCarpool($data: CarpoolInput!) {
    createCarpool(data: $data) {
      id
      departure_city
      arrival_city
      departure_date
      departure_time
      num_passenger
      toll
      duration
      price
      options
      driver {
        id
        firstname
      }
    }
  }
`;

export const DELETE_PASSENGER = gql`
  mutation DeleteBooking($carpoolId: Float!, $passengerId: Float!) {
    deleteBooking(carpoolId: $carpoolId, passengerId: $passengerId)
  }
`;

export const CREATE_BOOKING = gql`
  mutation CreateBooking($data: BookingInput!) {
    createBooking(data: $data) {
      id
      carpool {
        id
        departure_city
        arrival_city
        departure_date
        departure_time
        num_passenger
        toll
        duration
        price
        options
      }
      passenger {
        id
        firstname
      }
    }
  }
`;

export const UPDATE_CAR_INFOS = gql`
  mutation UpdateCarInfos(
    $brand: String!
    $color: String!
    $year: Float!
    $userId: Float!
  ) {
    updateCarInfos(brand: $brand, color: $color, year: $year, userId: $userId) {
      id
      brand
      color
      year
    }
  }
`;
