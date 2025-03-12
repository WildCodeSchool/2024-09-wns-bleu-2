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