import { gql } from '@apollo/client';

export const REGISTER = gql`
   mutation Register($data: UserInput!) {
      register(data: $data)
   }
`;