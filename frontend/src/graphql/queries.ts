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
