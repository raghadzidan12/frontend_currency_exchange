import { Api as api } from "./api-store";
export const addTagTypes = ["user", "exchange", "contact"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      loginUser: build.mutation<LoginUserApiResponse, LoginUserApiArg>({
        query: (queryArg) => ({
          url: `/users/login`,
          method: "POST",
          body: queryArg.loginDto,
        }),
        invalidatesTags: ["user"],
      }),
      getCurrentUser: build.query<
        GetCurrentUserApiResponse,
        GetCurrentUserApiArg
      >({
        query: () => ({ url: `/users/me` }),
        providesTags: ["user"],
      }),
      publicTest: build.query<PublicTestApiResponse, PublicTestApiArg>({
        query: () => ({ url: `/users/public-test` }),
        providesTags: ["user"],
      }),
      createUser: build.mutation<CreateUserApiResponse, CreateUserApiArg>({
        query: (queryArg) => ({
          url: `/users`,
          method: "POST",
          body: queryArg.createUserDto,
        }),
        invalidatesTags: ["user"],
      }),
      getAllUsers: build.query<GetAllUsersApiResponse, GetAllUsersApiArg>({
        query: () => ({ url: `/users` }),
        providesTags: ["user"],
      }),
      getUserById: build.query<GetUserByIdApiResponse, GetUserByIdApiArg>({
        query: (queryArg) => ({ url: `/users/${queryArg.id}` }),
        providesTags: ["user"],
      }),
      updateUser: build.mutation<UpdateUserApiResponse, UpdateUserApiArg>({
        query: (queryArg) => ({
          url: `/users/${queryArg.id}`,
          method: "PUT",
          body: queryArg.updateUserDto,
        }),
        invalidatesTags: ["user"],
      }),
      deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
        query: (queryArg) => ({
          url: `/users/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["user"],
      }),
      getActiveCurrencies: build.query<
        GetActiveCurrenciesApiResponse,
        GetActiveCurrenciesApiArg
      >({
        query: () => ({ url: `/exchange/currencies` }),
        providesTags: ["exchange"],
      }),
      createCurrency: build.mutation<
        CreateCurrencyApiResponse,
        CreateCurrencyApiArg
      >({
        query: (queryArg) => ({
          url: `/exchange/currencies`,
          method: "POST",
          body: queryArg.createCurrencyDto,
        }),
        invalidatesTags: ["exchange"],
      }),
      getCurrencyById: build.query<
        GetCurrencyByIdApiResponse,
        GetCurrencyByIdApiArg
      >({
        query: (queryArg) => ({ url: `/exchange/currencies/${queryArg.id}` }),
        providesTags: ["exchange"],
      }),
      updateCurrency: build.mutation<
        UpdateCurrencyApiResponse,
        UpdateCurrencyApiArg
      >({
        query: (queryArg) => ({
          url: `/exchange/currencies/${queryArg.id}`,
          method: "PATCH",
          body: queryArg.updateCurrencyDto,
        }),
        invalidatesTags: ["exchange"],
      }),
      deleteCurrency: build.mutation<
        DeleteCurrencyApiResponse,
        DeleteCurrencyApiArg
      >({
        query: (queryArg) => ({
          url: `/exchange/currencies/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["exchange"],
      }),
      calculateExchange: build.mutation<
        CalculateExchangeApiResponse,
        CalculateExchangeApiArg
      >({
        query: (queryArg) => ({
          url: `/exchange/calculate`,
          method: "POST",
          body: queryArg.exchangeCalculationDto,
        }),
        invalidatesTags: ["exchange"],
      }),
      getAllCurrencies: build.query<
        GetAllCurrenciesApiResponse,
        GetAllCurrenciesApiArg
      >({
        query: () => ({ url: `/exchange/admin/currencies` }),
        providesTags: ["exchange"],
      }),
      createExchangeRate: build.mutation<
        CreateExchangeRateApiResponse,
        CreateExchangeRateApiArg
      >({
        query: (queryArg) => ({
          url: `/exchange/rates`,
          method: "POST",
          body: queryArg.createExchangeRateDto,
        }),
        invalidatesTags: ["exchange"],
      }),
      getActiveExchangeRates: build.query<
        GetActiveExchangeRatesApiResponse,
        GetActiveExchangeRatesApiArg
      >({
        query: () => ({ url: `/exchange/rates` }),
        providesTags: ["exchange"],
      }),
      getAllExchangeRates: build.query<
        GetAllExchangeRatesApiResponse,
        GetAllExchangeRatesApiArg
      >({
        query: () => ({ url: `/exchange/admin/rates` }),
        providesTags: ["exchange"],
      }),
      getExchangeRateById: build.query<
        GetExchangeRateByIdApiResponse,
        GetExchangeRateByIdApiArg
      >({
        query: (queryArg) => ({ url: `/exchange/rates/${queryArg.id}` }),
        providesTags: ["exchange"],
      }),
      updateExchangeRate: build.mutation<
        UpdateExchangeRateApiResponse,
        UpdateExchangeRateApiArg
      >({
        query: (queryArg) => ({
          url: `/exchange/rates/${queryArg.id}`,
          method: "PATCH",
          body: queryArg.updateExchangeRateDto,
        }),
        invalidatesTags: ["exchange"],
      }),
      deleteExchangeRate: build.mutation<
        DeleteExchangeRateApiResponse,
        DeleteExchangeRateApiArg
      >({
        query: (queryArg) => ({
          url: `/exchange/rates/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["exchange"],
      }),
      updateExchangeRateByCurrency: build.mutation<
        UpdateExchangeRateByCurrencyApiResponse,
        UpdateExchangeRateByCurrencyApiArg
      >({
        query: (queryArg) => ({
          url: `/exchange/rates/currency/${queryArg.currencyId}`,
          method: "PATCH",
          body: queryArg.updateExchangeRateDto,
        }),
        invalidatesTags: ["exchange"],
      }),
      createContact: build.mutation<
        CreateContactApiResponse,
        CreateContactApiArg
      >({
        query: (queryArg) => ({
          url: `/contact`,
          method: "POST",
          body: queryArg.createContactDto,
        }),
        invalidatesTags: ["contact"],
      }),
      getAllContacts: build.query<
        GetAllContactsApiResponse,
        GetAllContactsApiArg
      >({
        query: () => ({ url: `/contact` }),
        providesTags: ["contact"],
      }),
      getContactById: build.query<
        GetContactByIdApiResponse,
        GetContactByIdApiArg
      >({
        query: (queryArg) => ({ url: `/contact/${queryArg.id}` }),
        providesTags: ["contact"],
      }),
      deleteContact: build.mutation<
        DeleteContactApiResponse,
        DeleteContactApiArg
      >({
        query: (queryArg) => ({
          url: `/contact/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["contact"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as apis };
export type LoginUserApiResponse =
  /** status 200 User logged in successfully */ LoginResponseDto;
export type LoginUserApiArg = {
  loginDto: LoginDto;
};
export type GetCurrentUserApiResponse =
  /** status 200 Current user profile */ User;
export type GetCurrentUserApiArg = void;
export type PublicTestApiResponse =
  /** status 200 Public endpoint test */ PublicTestResponseDto;
export type PublicTestApiArg = void;
export type CreateUserApiResponse =
  /** status 201 User created successfully */ User;
export type CreateUserApiArg = {
  createUserDto: CreateUserDto;
};
export type GetAllUsersApiResponse = /** status 200 List of all users */ User[];
export type GetAllUsersApiArg = void;
export type GetUserByIdApiResponse = /** status 200 User found */ User;
export type GetUserByIdApiArg = {
  id: string;
};
export type UpdateUserApiResponse =
  /** status 200 User updated successfully */ User;
export type UpdateUserApiArg = {
  id: string;
  updateUserDto: UpdateUserDto;
};
export type DeleteUserApiResponse = unknown;
export type DeleteUserApiArg = {
  id: string;
};
export type GetActiveCurrenciesApiResponse =
  /** status 200 List of all active currencies */ Currency[];
export type GetActiveCurrenciesApiArg = void;
export type CreateCurrencyApiResponse =
  /** status 201 Currency created */ Currency;
export type CreateCurrencyApiArg = {
  createCurrencyDto: CreateCurrencyDto;
};
export type GetCurrencyByIdApiResponse =
  /** status 200 Currency details */ Currency;
export type GetCurrencyByIdApiArg = {
  id: string;
};
export type UpdateCurrencyApiResponse =
  /** status 200 Currency updated */ Currency;
export type UpdateCurrencyApiArg = {
  id: string;
  updateCurrencyDto: UpdateCurrencyDto;
};
export type DeleteCurrencyApiResponse = unknown;
export type DeleteCurrencyApiArg = {
  id: string;
};
export type CalculateExchangeApiResponse =
  /** status 200 Exchange calculation result */ ExchangeCalculationResponseDto;
export type CalculateExchangeApiArg = {
  exchangeCalculationDto: ExchangeCalculationDto;
};
export type GetAllCurrenciesApiResponse =
  /** status 200 List of all currencies */ Currency[];
export type GetAllCurrenciesApiArg = void;
export type CreateExchangeRateApiResponse =
  /** status 201 Exchange rate created */ ExchangeRate;
export type CreateExchangeRateApiArg = {
  createExchangeRateDto: CreateExchangeRateDto;
};
export type GetActiveExchangeRatesApiResponse =
  /** status 200 List of active exchange rates */ ExchangeRate[];
export type GetActiveExchangeRatesApiArg = void;
export type GetAllExchangeRatesApiResponse =
  /** status 200 List of all exchange rates */ ExchangeRate[];
export type GetAllExchangeRatesApiArg = void;
export type GetExchangeRateByIdApiResponse =
  /** status 200 Exchange rate details */ ExchangeRate;
export type GetExchangeRateByIdApiArg = {
  id: string;
};
export type UpdateExchangeRateApiResponse =
  /** status 200 Exchange rate updated */ ExchangeRate;
export type UpdateExchangeRateApiArg = {
  id: string;
  updateExchangeRateDto: UpdateExchangeRateDto;
};
export type DeleteExchangeRateApiResponse = unknown;
export type DeleteExchangeRateApiArg = {
  id: string;
};
export type UpdateExchangeRateByCurrencyApiResponse =
  /** status 200 Exchange rate updated */ ExchangeRate;
export type UpdateExchangeRateByCurrencyApiArg = {
  currencyId: string;
  updateExchangeRateDto: UpdateExchangeRateDto;
};
export type CreateContactApiResponse =
  /** status 201 Contact message submitted successfully */ ContactResponseDto;
export type CreateContactApiArg = {
  createContactDto: CreateContactDto;
};
export type GetAllContactsApiResponse =
  /** status 200 List of all contact messages */ Contact[];
export type GetAllContactsApiArg = void;
export type GetContactByIdApiResponse =
  /** status 200 Contact message details */ Contact;
export type GetContactByIdApiArg = {
  id: string;
};
export type DeleteContactApiResponse = unknown;
export type DeleteContactApiArg = {
  id: string;
};
export type ObjectId = {};
export type User = {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  /** Creation date of the user */
  createdAt: string;
  /** Last update date of the user */
  updatedAt: string;
};
export type LoginResponseDto = {
  /** User entity */
  user: User;
  accessToken: string;
  message: string;
};
export type LoginDto = {
  email: string;
  password: string;
};
export type PublicTestResponseDto = {
  message: string;
  timestamp: string;
};
export type CreateUserDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  /** User role (defaults to USER if not specified) */
  role?: Role;
};
export type UpdateUserDto = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  /** User role (Admin only) */
  role?: Role;
};
export type Currency = {
  _id: ObjectId;
  /** ISO 4217 currency code */
  code: string;
  /** Currency name */
  name: string;
  /** Currency symbol */
  symbol: string;
  /** Price to USD: 1 unit of this currency = rateToUSD USD */
  rateToUSD: number;
  /** Whether currency is active */
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
export type CreateCurrencyDto = {
  /** ISO 4217 currency code */
  code: string;
  /** Currency name */
  name: string;
  /** Currency symbol */
  symbol: string;
  /** Price to USD: 1 unit of this currency = rateToUSD USD */
  rateToUSD: number;
  isActive?: boolean;
};
export type UpdateCurrencyDto = {
  name?: string;
  symbol?: string;
  /** Price to USD: 1 unit of this currency = rateToUSD USD */
  rateToUSD?: number;
  isActive?: boolean;
};
export type ExchangeCalculationResponseDto = {
  /** Source currency ID */
  fromCurrencyId: string;
  /** Source currency code */
  fromCurrencyCode: string;
  /** Target currency ID */
  toCurrencyId: string;
  /** Target currency code */
  toCurrencyCode: string;
  /** Amount in source currency */
  fromAmount: number;
  /** Calculated amount in target currency */
  toAmount: number;
  /** Exchange rate used for conversion */
  exchangeRate: number;
  /** Timestamp of calculation */
  calculatedAt: string;
};
export type ExchangeCalculationDto = {
  /** Source currency ID */
  fromCurrencyId: string;
  /** Target currency ID */
  toCurrencyId: string;
  /** Amount to exchange in source currency */
  amount: number;
};
export type ExchangeRate = {
  _id: ObjectId;
  /** Currency ID this rate belongs to */
  currencyId: ObjectId;
  /** Rate from this currency to USD (1 currency = rateToUSD USD) */
  rateToUSD: number;
  /** Whether this rate is active */
  isActive: boolean;
  /** Admin user ID who set this rate */
  createdBy?: ObjectId;
  createdAt: string;
  updatedAt: string;
};
export type CreateExchangeRateDto = {
  /** Currency ID to set the rate for */
  currencyId: string;
  /** Rate from this currency to USD (1 currency = rateToUSD USD) */
  rateToUSD: number;
  isActive?: boolean;
};
export type UpdateExchangeRateDto = {
  /** Rate from this currency to USD */
  rateToUSD?: number;
  isActive?: boolean;
};
export type Contact = {
  _id: ObjectId;
  /** Contact name */
  name: string;
  /** Contact email */
  email: string;
  /** Message subject */
  subject: string;
  /** Message content */
  message: string;
  /** Creation date of the contact message */
  createdAt: string;
};
export type ContactResponseDto = {
  /** Created contact message */
  contact: Contact;
  message: string;
};
export type CreateContactDto = {
  /** Your full name */
  name: string;
  /** Your email address */
  email: string;
  /** Message subject */
  subject: string;
  /** Your message */
  message: string;
};
export enum Role {
  Admin = "admin",
  User = "user",
}
export const {
  useLoginUserMutation,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  usePublicTestQuery,
  useLazyPublicTestQuery,
  useCreateUserMutation,
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetActiveCurrenciesQuery,
  useLazyGetActiveCurrenciesQuery,
  useCreateCurrencyMutation,
  useGetCurrencyByIdQuery,
  useLazyGetCurrencyByIdQuery,
  useUpdateCurrencyMutation,
  useDeleteCurrencyMutation,
  useCalculateExchangeMutation,
  useGetAllCurrenciesQuery,
  useLazyGetAllCurrenciesQuery,
  useCreateExchangeRateMutation,
  useGetActiveExchangeRatesQuery,
  useLazyGetActiveExchangeRatesQuery,
  useGetAllExchangeRatesQuery,
  useLazyGetAllExchangeRatesQuery,
  useGetExchangeRateByIdQuery,
  useLazyGetExchangeRateByIdQuery,
  useUpdateExchangeRateMutation,
  useDeleteExchangeRateMutation,
  useUpdateExchangeRateByCurrencyMutation,
  useCreateContactMutation,
  useGetAllContactsQuery,
  useLazyGetAllContactsQuery,
  useGetContactByIdQuery,
  useLazyGetContactByIdQuery,
  useDeleteContactMutation,
} = injectedRtkApi;
