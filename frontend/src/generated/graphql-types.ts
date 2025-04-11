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
  brand?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  year?: Maybe<Scalars['Float']['output']>;
};

export type CarInfosInput = {
  brand: Scalars['String']['input'];
  color?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Float']['input']>;
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
  options: Array<Scalars['String']['output']>;
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
  options?: InputMaybe<Array<Scalars['String']['input']>>;
  price: Scalars['Float']['input'];
  toll: Scalars['Boolean']['input'];
};

export type City = {
  __typename?: 'City';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmEmail: Scalars['String']['output'];
  createBooking: Booking;
  createCarInfos: CarInfos;
  createCarpool: Carpool;
  deleteCarpool: Scalars['String']['output'];
  login: Scalars['String']['output'];
  logout: Scalars['String']['output'];
  register: Scalars['String']['output'];
  setUserCar: User;
  updateUserProfile: User;
};


export type MutationConfirmEmailArgs = {
  codeByUser: Scalars['String']['input'];
};


export type MutationCreateBookingArgs = {
  data: BookingInput;
};


export type MutationCreateCarInfosArgs = {
  data: CarInfosInput;
};


export type MutationCreateCarpoolArgs = {
  data: CarpoolInput;
};


export type MutationDeleteCarpoolArgs = {
  id: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRegisterArgs = {
  data: UserInput;
};


export type MutationSetUserCarArgs = {
  carId: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
};


export type MutationUpdateUserProfileArgs = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  birthdate?: InputMaybe<Scalars['DateTimeISO']['input']>;
  email: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getAllUsers: Array<User>;
  getBookings: Array<Booking>;
  getBookingsForPassenger: Array<Booking>;
  getCarBrands: Array<Scalars['String']['output']>;
  getCarColors: Array<Scalars['String']['output']>;
  getCarYears: Array<Scalars['Float']['output']>;
  getCarpoolById: Carpool;
  getCarpools: Array<Carpool>;
  getCarpoolsByUserId: Array<Carpool>;
  getCities: Array<City>;
  getUserInfo: UserInfo;
  getUserInfoConnexion?: Maybe<User>;
  searchCarpools: Array<Carpool>;
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


export type QuerySearchCarpoolsArgs = {
  arrival?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  departure?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
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

export type UserInfo = {
  __typename?: 'UserInfo';
  avatar?: Maybe<Scalars['String']['output']>;
  birthdate?: Maybe<Scalars['DateTimeISO']['output']>;
  car?: Maybe<CarInfos>;
  email?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  isLoggedIn: Scalars['Boolean']['output'];
  lastname?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
};

export type UserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  birthdate: Scalars['DateTimeISO']['input'];
  brand?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  year?: InputMaybe<Scalars['Float']['input']>;
};

export type RegisterMutationVariables = Exact<{
  data: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: string };

export type ConfirmEmailMutationVariables = Exact<{
  codeByUser: Scalars['String']['input'];
}>;


export type ConfirmEmailMutation = { __typename?: 'Mutation', confirmEmail: string };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type UpdateUserProfileMutationVariables = Exact<{
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateUserProfileMutation = { __typename?: 'Mutation', updateUserProfile: { __typename?: 'User', email: string, firstname: string, lastname: string, phone: string } };

export type DeleteCarpoolMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeleteCarpoolMutation = { __typename?: 'Mutation', deleteCarpool: string };

export type CreateCarpoolMutationVariables = Exact<{
  data: CarpoolInput;
}>;


export type CreateCarpoolMutation = { __typename?: 'Mutation', createCarpool: { __typename?: 'Carpool', id: string, departure_city: string, arrival_city: string, departure_date: string, departure_time: string, num_passenger: number, toll: boolean, duration: number, price: number, options: Array<string>, driver: { __typename?: 'User', id: number, firstname: string } } };

export type GetUserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserInfoQuery = { __typename?: 'Query', getUserInfo: { __typename?: 'UserInfo', isLoggedIn: boolean, id?: number | null, email?: string | null, firstname?: string | null, lastname?: string | null, birthdate?: any | null, gender?: string | null, phone?: string | null, avatar?: string | null, car?: { __typename?: 'CarInfos', brand?: string | null, color?: string | null, year?: number | null } | null } };

export type GetCarpoolByIdQueryVariables = Exact<{
  getCarpoolByIdId: Scalars['Float']['input'];
}>;


export type GetCarpoolByIdQuery = { __typename?: 'Query', getCarpoolById: { __typename?: 'Carpool', id: string, departure_date: string, departure_time: string, departure_city: string, arrival_city: string, num_passenger: number, toll: boolean, duration: number, price: number, options: Array<string>, driver: { __typename?: 'User', firstname: string, id: number, avatar?: string | null, car?: { __typename?: 'CarInfos', brand?: string | null, color?: string | null } | null }, bookings: Array<{ __typename?: 'Booking', id: number, numPassenger: number, reservedAt: any, passenger: { __typename?: 'User', id: number, firstname: string, avatar?: string | null } }> } };

export type GetCarpoolsByUserIdQueryVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type GetCarpoolsByUserIdQuery = { __typename?: 'Query', getCarpoolsByUserId: Array<{ __typename?: 'Carpool', id: string, departure_date: string, departure_time: string, departure_city: string, arrival_city: string, num_passenger: number, toll: boolean, duration: number, price: number, options: Array<string>, driver: { __typename?: 'User', firstname: string, id: number, avatar?: string | null }, bookings: Array<{ __typename?: 'Booking', numPassenger: number, passenger: { __typename?: 'User', id: number, firstname: string, avatar?: string | null } }> }> };

export type GetBookingsForPassengerQueryVariables = Exact<{
  passengerId: Scalars['Float']['input'];
}>;


export type GetBookingsForPassengerQuery = { __typename?: 'Query', getBookingsForPassenger: Array<{ __typename?: 'Booking', id: number, numPassenger: number, reservedAt: any, carpool: { __typename?: 'Carpool', arrival_city: string, departure_city: string, departure_date: string, departure_time: string, duration: number, id: string, num_passenger: number, price: number, toll: boolean, options: Array<string>, driver: { __typename?: 'User', avatar?: string | null, birthdate: any, email: string, firstname: string, gender: string, id: number, lastname: string, phone: string, car?: { __typename?: 'CarInfos', brand?: string | null, color?: string | null, id: string, year?: number | null } | null } }, passenger: { __typename?: 'User', avatar?: string | null, birthdate: any, email: string, firstname: string, gender: string, lastname: string, phone: string, id: number, car?: { __typename?: 'CarInfos', brand?: string | null, color?: string | null, id: string, year?: number | null } | null } }> };

export type SearchCarpoolsQueryVariables = Exact<{
  departure: Scalars['String']['input'];
  arrival: Scalars['String']['input'];
  date: Scalars['String']['input'];
  time?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchCarpoolsQuery = { __typename?: 'Query', searchCarpools: Array<{ __typename?: 'Carpool', id: string, departure_city: string, arrival_city: string, departure_date: string, departure_time: string, num_passenger: number, price: number, duration: number, toll: boolean, options: Array<string>, driver: { __typename?: 'User', firstname: string, lastname: string, avatar?: string | null } }> };

export type GetCitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCitiesQuery = { __typename?: 'Query', getCities: Array<{ __typename?: 'City', id: string, name: string }> };

export type GetCarBrandsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCarBrandsQuery = { __typename?: 'Query', getCarBrands: Array<string> };

export type GetCarColorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCarColorsQuery = { __typename?: 'Query', getCarColors: Array<string> };

export type GetCarYearsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCarYearsQuery = { __typename?: 'Query', getCarYears: Array<number> };


export const RegisterDocument = gql`
    mutation Register($data: UserInput!) {
  register(data: $data)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ConfirmEmailDocument = gql`
    mutation ConfirmEmail($codeByUser: String!) {
  confirmEmail(codeByUser: $codeByUser)
}
    `;
export type ConfirmEmailMutationFn = Apollo.MutationFunction<ConfirmEmailMutation, ConfirmEmailMutationVariables>;

/**
 * __useConfirmEmailMutation__
 *
 * To run a mutation, you first call `useConfirmEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmEmailMutation, { data, loading, error }] = useConfirmEmailMutation({
 *   variables: {
 *      codeByUser: // value for 'codeByUser'
 *   },
 * });
 */
export function useConfirmEmailMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmEmailMutation, ConfirmEmailMutationVariables>(ConfirmEmailDocument, options);
      }
export type ConfirmEmailMutationHookResult = ReturnType<typeof useConfirmEmailMutation>;
export type ConfirmEmailMutationResult = Apollo.MutationResult<ConfirmEmailMutation>;
export type ConfirmEmailMutationOptions = Apollo.BaseMutationOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const UpdateUserProfileDocument = gql`
    mutation UpdateUserProfile($email: String!, $firstname: String!, $lastname: String!, $phone: String) {
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
export type UpdateUserProfileMutationFn = Apollo.MutationFunction<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;

/**
 * __useUpdateUserProfileMutation__
 *
 * To run a mutation, you first call `useUpdateUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProfileMutation, { data, loading, error }] = useUpdateUserProfileMutation({
 *   variables: {
 *      email: // value for 'email'
 *      firstname: // value for 'firstname'
 *      lastname: // value for 'lastname'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useUpdateUserProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(UpdateUserProfileDocument, options);
      }
export type UpdateUserProfileMutationHookResult = ReturnType<typeof useUpdateUserProfileMutation>;
export type UpdateUserProfileMutationResult = Apollo.MutationResult<UpdateUserProfileMutation>;
export type UpdateUserProfileMutationOptions = Apollo.BaseMutationOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const DeleteCarpoolDocument = gql`
    mutation DeleteCarpool($id: Float!) {
  deleteCarpool(id: $id)
}
    `;
export type DeleteCarpoolMutationFn = Apollo.MutationFunction<DeleteCarpoolMutation, DeleteCarpoolMutationVariables>;

/**
 * __useDeleteCarpoolMutation__
 *
 * To run a mutation, you first call `useDeleteCarpoolMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCarpoolMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCarpoolMutation, { data, loading, error }] = useDeleteCarpoolMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCarpoolMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCarpoolMutation, DeleteCarpoolMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCarpoolMutation, DeleteCarpoolMutationVariables>(DeleteCarpoolDocument, options);
      }
export type DeleteCarpoolMutationHookResult = ReturnType<typeof useDeleteCarpoolMutation>;
export type DeleteCarpoolMutationResult = Apollo.MutationResult<DeleteCarpoolMutation>;
export type DeleteCarpoolMutationOptions = Apollo.BaseMutationOptions<DeleteCarpoolMutation, DeleteCarpoolMutationVariables>;
export const CreateCarpoolDocument = gql`
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
export type CreateCarpoolMutationFn = Apollo.MutationFunction<CreateCarpoolMutation, CreateCarpoolMutationVariables>;

/**
 * __useCreateCarpoolMutation__
 *
 * To run a mutation, you first call `useCreateCarpoolMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCarpoolMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCarpoolMutation, { data, loading, error }] = useCreateCarpoolMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCarpoolMutation(baseOptions?: Apollo.MutationHookOptions<CreateCarpoolMutation, CreateCarpoolMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCarpoolMutation, CreateCarpoolMutationVariables>(CreateCarpoolDocument, options);
      }
export type CreateCarpoolMutationHookResult = ReturnType<typeof useCreateCarpoolMutation>;
export type CreateCarpoolMutationResult = Apollo.MutationResult<CreateCarpoolMutation>;
export type CreateCarpoolMutationOptions = Apollo.BaseMutationOptions<CreateCarpoolMutation, CreateCarpoolMutationVariables>;
export const GetUserInfoDocument = gql`
    query GetUserInfo {
  getUserInfo {
    isLoggedIn
    id
    email
    firstname
    lastname
    birthdate
    gender
    phone
    avatar
    car {
      brand
      color
      year
    }
  }
}
    `;

/**
 * __useGetUserInfoQuery__
 *
 * To run a query within a React component, call `useGetUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
      }
export function useGetUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
        }
export function useGetUserInfoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
        }
export type GetUserInfoQueryHookResult = ReturnType<typeof useGetUserInfoQuery>;
export type GetUserInfoLazyQueryHookResult = ReturnType<typeof useGetUserInfoLazyQuery>;
export type GetUserInfoSuspenseQueryHookResult = ReturnType<typeof useGetUserInfoSuspenseQuery>;
export type GetUserInfoQueryResult = Apollo.QueryResult<GetUserInfoQuery, GetUserInfoQueryVariables>;
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
      car {
        brand
        color
      }
    }
    bookings {
      id
      numPassenger
      reservedAt
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
export const SearchCarpoolsDocument = gql`
    query SearchCarpools($departure: String!, $arrival: String!, $date: String!, $time: String) {
  searchCarpools(
    departure: $departure
    arrival: $arrival
    date: $date
    time: $time
  ) {
    id
    departure_city
    arrival_city
    departure_date
    departure_time
    num_passenger
    price
    duration
    toll
    options
    driver {
      firstname
      lastname
      avatar
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
 *      time: // value for 'time'
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
export const GetCarBrandsDocument = gql`
    query GetCarBrands {
  getCarBrands
}
    `;

/**
 * __useGetCarBrandsQuery__
 *
 * To run a query within a React component, call `useGetCarBrandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarBrandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarBrandsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCarBrandsQuery(baseOptions?: Apollo.QueryHookOptions<GetCarBrandsQuery, GetCarBrandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarBrandsQuery, GetCarBrandsQueryVariables>(GetCarBrandsDocument, options);
      }
export function useGetCarBrandsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarBrandsQuery, GetCarBrandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarBrandsQuery, GetCarBrandsQueryVariables>(GetCarBrandsDocument, options);
        }
export function useGetCarBrandsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCarBrandsQuery, GetCarBrandsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCarBrandsQuery, GetCarBrandsQueryVariables>(GetCarBrandsDocument, options);
        }
export type GetCarBrandsQueryHookResult = ReturnType<typeof useGetCarBrandsQuery>;
export type GetCarBrandsLazyQueryHookResult = ReturnType<typeof useGetCarBrandsLazyQuery>;
export type GetCarBrandsSuspenseQueryHookResult = ReturnType<typeof useGetCarBrandsSuspenseQuery>;
export type GetCarBrandsQueryResult = Apollo.QueryResult<GetCarBrandsQuery, GetCarBrandsQueryVariables>;
export const GetCarColorsDocument = gql`
    query GetCarColors {
  getCarColors
}
    `;

/**
 * __useGetCarColorsQuery__
 *
 * To run a query within a React component, call `useGetCarColorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarColorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarColorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCarColorsQuery(baseOptions?: Apollo.QueryHookOptions<GetCarColorsQuery, GetCarColorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarColorsQuery, GetCarColorsQueryVariables>(GetCarColorsDocument, options);
      }
export function useGetCarColorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarColorsQuery, GetCarColorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarColorsQuery, GetCarColorsQueryVariables>(GetCarColorsDocument, options);
        }
export function useGetCarColorsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCarColorsQuery, GetCarColorsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCarColorsQuery, GetCarColorsQueryVariables>(GetCarColorsDocument, options);
        }
export type GetCarColorsQueryHookResult = ReturnType<typeof useGetCarColorsQuery>;
export type GetCarColorsLazyQueryHookResult = ReturnType<typeof useGetCarColorsLazyQuery>;
export type GetCarColorsSuspenseQueryHookResult = ReturnType<typeof useGetCarColorsSuspenseQuery>;
export type GetCarColorsQueryResult = Apollo.QueryResult<GetCarColorsQuery, GetCarColorsQueryVariables>;
export const GetCarYearsDocument = gql`
    query GetCarYears {
  getCarYears
}
    `;

/**
 * __useGetCarYearsQuery__
 *
 * To run a query within a React component, call `useGetCarYearsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarYearsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarYearsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCarYearsQuery(baseOptions?: Apollo.QueryHookOptions<GetCarYearsQuery, GetCarYearsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarYearsQuery, GetCarYearsQueryVariables>(GetCarYearsDocument, options);
      }
export function useGetCarYearsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarYearsQuery, GetCarYearsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarYearsQuery, GetCarYearsQueryVariables>(GetCarYearsDocument, options);
        }
export function useGetCarYearsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCarYearsQuery, GetCarYearsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCarYearsQuery, GetCarYearsQueryVariables>(GetCarYearsDocument, options);
        }
export type GetCarYearsQueryHookResult = ReturnType<typeof useGetCarYearsQuery>;
export type GetCarYearsLazyQueryHookResult = ReturnType<typeof useGetCarYearsLazyQuery>;
export type GetCarYearsSuspenseQueryHookResult = ReturnType<typeof useGetCarYearsSuspenseQuery>;
export type GetCarYearsQueryResult = Apollo.QueryResult<GetCarYearsQuery, GetCarYearsQueryVariables>;