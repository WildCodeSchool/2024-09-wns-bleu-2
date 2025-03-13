import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Booking = {
  __typename?: 'Booking';
  carpool: Carpool;
  id: Scalars['Float']['output'];
  numPassenger: Scalars['Float']['output'];
  passenger: User;
  reservedAt: Scalars['DateTimeISO']['output'];
};

export type BookingInput = {
  carpool_id: Scalars['Float']['input'];
  numPassenger: Scalars['Float']['input'];
  passenger_id: Scalars['Float']['input'];
  reservedAt: Scalars['DateTimeISO']['input'];
};

export type CarInfos = {
  __typename?: 'CarInfos';
  brand: Scalars['String']['output'];
  color?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  model?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

export type Carpool = {
  __typename?: 'Carpool';
  arrival_city: Scalars['String']['output'];
  departure_city: Scalars['String']['output'];
  departure_date: Scalars['String']['output'];
  departure_time: Scalars['String']['output'];
  driver: User;
  duration: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  num_passenger: Scalars['Float']['output'];
  options: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  type_of_road: Scalars['String']['output'];
};

export type CarpoolInput = {
  arrival_city: Scalars['String']['input'];
  departure_city: Scalars['String']['input'];
  departure_date: Scalars['String']['input'];
  departure_time: Scalars['String']['input'];
  driver_id: Scalars['Float']['input'];
  duration: Scalars['Float']['input'];
  num_passenger: Scalars['Float']['input'];
  options: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  type_of_road: Scalars['String']['input'];
};

export type City = {
  __typename?: 'City';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBooking: Booking;
  createCarpool: Carpool;
  register: Scalars['String']['output'];
  setUserCar: User;
};


export type MutationCreateBookingArgs = {
  data: BookingInput;
};


export type MutationCreateCarpoolArgs = {
  data: CarpoolInput;
};


export type MutationRegisterArgs = {
  data: UserInput;
};


export type MutationSetUserCarArgs = {
  carId: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllUsers: Array<User>;
  getBookings: Array<Booking>;
  getCarInfos: Array<CarInfos>;
  getCarpoolById: Carpool;
  getCarpools: Array<Carpool>;
  getCities: Array<City>;
  searchCarpools: Array<Carpool>;
};


export type QueryGetCarpoolByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QuerySearchCarpoolsArgs = {
  arrival?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  departure?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String']['output'];
  birthdate: Scalars['DateTimeISO']['output'];
  car?: Maybe<CarInfos>;
  carpools?: Maybe<Array<Carpool>>;
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  lastname: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type UserInput = {
  avatar: Scalars['String']['input'];
  birthDate: Scalars['DateTimeISO']['input'];
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type GetCarpoolByIdQueryVariables = Exact<{
  getCarpoolByIdId: Scalars['Float']['input'];
}>;


export type GetCarpoolByIdQuery = { __typename?: 'Query', getCarpoolById: { __typename?: 'Carpool', arrival_city: string, departure_city: string, departure_date: string, departure_time: string, num_passenger: number, options: string, price: number, type_of_road: string, driver: { __typename?: 'User', firstname: string, lastname: string } } };

export type SearchCarpoolsQueryVariables = Exact<{
  departure: Scalars['String']['input'];
  arrival: Scalars['String']['input'];
  date: Scalars['String']['input'];
}>;


export type SearchCarpoolsQuery = { __typename?: 'Query', searchCarpools: Array<{ __typename?: 'Carpool', id: string, departure_city: string, arrival_city: string, departure_date: string, departure_time: string, num_passenger: number, price: number, driver: { __typename?: 'User', firstname: string, lastname: string } }> };

export type GetCitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCitiesQuery = { __typename?: 'Query', getCities: Array<{ __typename?: 'City', id: string, name: string }> };


export const GetCarpoolByIdDocument = gql`
    query GetCarpoolById($getCarpoolByIdId: Float!) {
  getCarpoolById(id: $getCarpoolByIdId) {
    arrival_city
    departure_city
    departure_date
    departure_time
    num_passenger
    options
    price
    type_of_road
    driver {
      firstname
      lastname
    }
  }
}
    `;

/**
 * __useGetCarpoolByIdQuery__
 *
 * To run a query within a React component, call `useGetCarpoolByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarpoolByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarpoolByIdQuery({
 *   variables: {
 *      getCarpoolByIdId: // value for 'getCarpoolByIdId'
 *   },
 * });
 */
export function useGetCarpoolByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCarpoolByIdQuery, GetCarpoolByIdQueryVariables> & ({ variables: GetCarpoolByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarpoolByIdQuery, GetCarpoolByIdQueryVariables>(GetCarpoolByIdDocument, options);
      }
export function useGetCarpoolByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarpoolByIdQuery, GetCarpoolByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarpoolByIdQuery, GetCarpoolByIdQueryVariables>(GetCarpoolByIdDocument, options);
        }
export function useGetCarpoolByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCarpoolByIdQuery, GetCarpoolByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCarpoolByIdQuery, GetCarpoolByIdQueryVariables>(GetCarpoolByIdDocument, options);
        }
export type GetCarpoolByIdQueryHookResult = ReturnType<typeof useGetCarpoolByIdQuery>;
export type GetCarpoolByIdLazyQueryHookResult = ReturnType<typeof useGetCarpoolByIdLazyQuery>;
export type GetCarpoolByIdSuspenseQueryHookResult = ReturnType<typeof useGetCarpoolByIdSuspenseQuery>;
export type GetCarpoolByIdQueryResult = Apollo.QueryResult<GetCarpoolByIdQuery, GetCarpoolByIdQueryVariables>;
export const SearchCarpoolsDocument = gql`
    query SearchCarpools($departure: String!, $arrival: String!, $date: String!) {
  searchCarpools(departure: $departure, arrival: $arrival, date: $date) {
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

/**
 * __useSearchCarpoolsQuery__
 *
 * To run a query within a React component, call `useSearchCarpoolsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCarpoolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCarpoolsQuery({
 *   variables: {
 *      departure: // value for 'departure'
 *      arrival: // value for 'arrival'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useSearchCarpoolsQuery(baseOptions: Apollo.QueryHookOptions<SearchCarpoolsQuery, SearchCarpoolsQueryVariables> & ({ variables: SearchCarpoolsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchCarpoolsQuery, SearchCarpoolsQueryVariables>(SearchCarpoolsDocument, options);
      }
export function useSearchCarpoolsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchCarpoolsQuery, SearchCarpoolsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchCarpoolsQuery, SearchCarpoolsQueryVariables>(SearchCarpoolsDocument, options);
        }
export function useSearchCarpoolsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchCarpoolsQuery, SearchCarpoolsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchCarpoolsQuery, SearchCarpoolsQueryVariables>(SearchCarpoolsDocument, options);
        }
export type SearchCarpoolsQueryHookResult = ReturnType<typeof useSearchCarpoolsQuery>;
export type SearchCarpoolsLazyQueryHookResult = ReturnType<typeof useSearchCarpoolsLazyQuery>;
export type SearchCarpoolsSuspenseQueryHookResult = ReturnType<typeof useSearchCarpoolsSuspenseQuery>;
export type SearchCarpoolsQueryResult = Apollo.QueryResult<SearchCarpoolsQuery, SearchCarpoolsQueryVariables>;
export const GetCitiesDocument = gql`
    query GetCities {
  getCities {
    id
    name
  }
}
    `;

/**
 * __useGetCitiesQuery__
 *
 * To run a query within a React component, call `useGetCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetCitiesQuery, GetCitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCitiesQuery, GetCitiesQueryVariables>(GetCitiesDocument, options);
      }
export function useGetCitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCitiesQuery, GetCitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCitiesQuery, GetCitiesQueryVariables>(GetCitiesDocument, options);
        }
export function useGetCitiesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCitiesQuery, GetCitiesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCitiesQuery, GetCitiesQueryVariables>(GetCitiesDocument, options);
        }
export type GetCitiesQueryHookResult = ReturnType<typeof useGetCitiesQuery>;
export type GetCitiesLazyQueryHookResult = ReturnType<typeof useGetCitiesLazyQuery>;
export type GetCitiesSuspenseQueryHookResult = ReturnType<typeof useGetCitiesSuspenseQuery>;
export type GetCitiesQueryResult = Apollo.QueryResult<GetCitiesQuery, GetCitiesQueryVariables>;