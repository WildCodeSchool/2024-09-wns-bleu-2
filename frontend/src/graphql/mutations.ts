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
