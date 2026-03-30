import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { configureStore } from "@reduxjs/toolkit";

export const rtkApi = createApi({
  reducerPath: "rtkApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api-entertainment-v1.enlight.diagnal.com",
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<any, void>({
      //@ts-ignore
      query: (queryArg) => ({
        url: "/content/filters/DOCUMENTARIES?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=en-US&platform=web",
      }),
    }),
    getRawMovies: builder.query<any, void>({
      //@ts-ignore
      query: (queryArg) => ({
        url: "/content/filters/DOCUMENTARIES?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=en-US&platform=web",
        responseHandler: "text",
      }),
    }),
  }),
});

//@ts-ignore
export const { useGetMoviesQuery, useGetRawMoviesNoQuery } = rtkApi;

export const benchmarkStore = configureStore({
  reducer: { [rtkApi.reducerPath]: rtkApi.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkApi.middleware),
});
