import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const ratesApi = createApi({
  reducerPath: "ratesApi",
  baseQuery: fetchBaseQuery({baseUrl: "https://api.exchangerate.host/latest"}),
  endpoints: (builder) => ({
    getRates: builder.query({
      query: (base: string) => `?base=${base}`
    })
  })
});

export const {useGetRatesQuery} = ratesApi; 