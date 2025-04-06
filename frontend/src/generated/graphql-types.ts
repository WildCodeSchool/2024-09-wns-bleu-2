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
  bookings: Array<Booking>;
  departure_city: Scalars['String']['output'];
  departure_date: Scalars['String']['output'];
  departure_time: Scalars['String']['output'];
  driver: User;
  duration: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  num_passenger: Scalars['Float']['output'];
  options: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  toll: Scalars['Boolean']['output'];
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
  toll: Scalars['Boolean']['input'];
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
  getBookingsForPassenger: Array<Booking>;
  getCarInfos: Array<CarInfos>;
  getCarpoolById: Carpool;
  getCarpools: Array<Carpool>;
  getCarpoolsByUserId: Array<Carpool>;
};


export type QueryGetBookingsForPassengerArgs = {
  passengerId: Scalars['Float']['input'];
};


export type QueryGetCarpoolByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetCarpoolsByUserIdArgs = {
  userId: Scalars['Float']['input'];
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
  birthdate: Scalars['DateTimeISO']['input'];
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


export type GetCarpoolByIdQuery = { __typename?: 'Query', getCarpoolById: { __typename?: 'Carpool', id: string, departure_date: string, departure_time: string, departure_city: string, arrival_city: string, num_passenger: number, toll: boolean, duration: number, price: number, options: string, driver: { __typename?: 'User', firstname: string, id: number, avatar: string }, bookings: Array<{ __typename?: 'Booking', numPassenger: number, passenger: { __typename?: 'User', id: number, firstname: string, avatar: string } }> } };

export type GetCarpoolsByUserIdQueryVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type GetCarpoolsByUserIdQuery = { __typename?: 'Query', getCarpoolsByUserId: Array<{ __typename?: 'Carpool', id: string, departure_date: string, departure_time: string, departure_city: string, arrival_city: string, num_passenger: number, toll: boolean, duration: number, price: number, options: string, driver: { __typename?: 'User', firstname: string, id: number, avatar: string }, bookings: Array<{ __typename?: 'Booking', numPassenger: number, passenger: { __typename?: 'User', id: number, firstname: string, avatar: string } }> }> };

export type GetBookingsForPassengerQueryVariables = Exact<{
  passengerId: Scalars['Float']['input'];
}>;


export type GetBookingsForPassengerQuery = { __typename?: 'Query', getBookingsForPassenger: Array<{ __typename?: 'Booking', id: number, numPassenger: number, reservedAt: any, carpool: { __typename?: 'Carpool', arrival_city: string, departure_city: string, departure_date: string, departure_time: string, duration: number, id: string, num_passenger: number, price: number, toll: boolean, options: string, driver: { __typename?: 'User', avatar: string, birthdate: any, email: string, firstname: string, gender: string, id: number, lastname: string, phone: string, car?: { __typename?: 'CarInfos', brand: string, color?: string | null, id: string, model?: string | null, year?: number | null } | null } }, passenger: { __typename?: 'User', avatar: string, birthdate: any, email: string, firstname: string, gender: string, lastname: string, phone: string, id: number, car?: { __typename?: 'CarInfos', brand: string, color?: string | null, id: string, model?: string | null, year?: number | null } | null } }> };


export const GetCarpoolByIdDocument = gql`
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
export const GetCarpoolsByUserIdDocument = gql`
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

/**
 * __useGetCarpoolsByUserIdQuery__
 *
 * To run a query within a React component, call `useGetCarpoolsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarpoolsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarpoolsByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetCarpoolsByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetCarpoolsByUserIdQuery, GetCarpoolsByUserIdQueryVariables> & ({ variables: GetCarpoolsByUserIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarpoolsByUserIdQuery, GetCarpoolsByUserIdQueryVariables>(GetCarpoolsByUserIdDocument, options);
      }
export function useGetCarpoolsByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarpoolsByUserIdQuery, GetCarpoolsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarpoolsByUserIdQuery, GetCarpoolsByUserIdQueryVariables>(GetCarpoolsByUserIdDocument, options);
        }
export function useGetCarpoolsByUserIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCarpoolsByUserIdQuery, GetCarpoolsByUserIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCarpoolsByUserIdQuery, GetCarpoolsByUserIdQueryVariables>(GetCarpoolsByUserIdDocument, options);
        }
export type GetCarpoolsByUserIdQueryHookResult = ReturnType<typeof useGetCarpoolsByUserIdQuery>;
export type GetCarpoolsByUserIdLazyQueryHookResult = ReturnType<typeof useGetCarpoolsByUserIdLazyQuery>;
export type GetCarpoolsByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetCarpoolsByUserIdSuspenseQuery>;
export type GetCarpoolsByUserIdQueryResult = Apollo.QueryResult<GetCarpoolsByUserIdQuery, GetCarpoolsByUserIdQueryVariables>;
export const GetBookingsForPassengerDocument = gql`
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

/**
 * __useGetBookingsForPassengerQuery__
 *
 * To run a query within a React component, call `useGetBookingsForPassengerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookingsForPassengerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookingsForPassengerQuery({
 *   variables: {
 *      passengerId: // value for 'passengerId'
 *   },
 * });
 */
export function useGetBookingsForPassengerQuery(baseOptions: Apollo.QueryHookOptions<GetBookingsForPassengerQuery, GetBookingsForPassengerQueryVariables> & ({ variables: GetBookingsForPassengerQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookingsForPassengerQuery, GetBookingsForPassengerQueryVariables>(GetBookingsForPassengerDocument, options);
      }
export function useGetBookingsForPassengerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookingsForPassengerQuery, GetBookingsForPassengerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookingsForPassengerQuery, GetBookingsForPassengerQueryVariables>(GetBookingsForPassengerDocument, options);
        }
export function useGetBookingsForPassengerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBookingsForPassengerQuery, GetBookingsForPassengerQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBookingsForPassengerQuery, GetBookingsForPassengerQueryVariables>(GetBookingsForPassengerDocument, options);
        }
export type GetBookingsForPassengerQueryHookResult = ReturnType<typeof useGetBookingsForPassengerQuery>;
export type GetBookingsForPassengerLazyQueryHookResult = ReturnType<typeof useGetBookingsForPassengerLazyQuery>;
export type GetBookingsForPassengerSuspenseQueryHookResult = ReturnType<typeof useGetBookingsForPassengerSuspenseQuery>;
export type GetBookingsForPassengerQueryResult = Apollo.QueryResult<GetBookingsForPassengerQuery, GetBookingsForPassengerQueryVariables>;