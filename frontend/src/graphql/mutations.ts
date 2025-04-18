import { gql } from '@apollo/client';

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

export const LOGOUT = gql`
   mutation Logout {
      logout
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