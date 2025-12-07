
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
// import { getFetchBaseQuery } from 'rtk-upload-utils';

export const Api = createApi({
  reducerPath: "api",
  // tagTypes: [],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',

    // baseUrl: getEnvironmentVariables().NEXT_PUBLIC_API_URL,

    prepareHeaders: async (headers, { getState, endpoint }) => {
      const state = getState() as RootState;





      const token = state.auth.accessToken;


      headers.set("content-type", "application/json");
      if (!headers.has("Authorization") && token) {
        headers.set("Authorization", `Bearer ${token}`);
      }


      // user-agent-type
      headers.set("user-agent-type", "web");
      headers.set("Accept", "application/json");

      return headers;
    },


  }),
 

  endpoints: () => ({}),
});
