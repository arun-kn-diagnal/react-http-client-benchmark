import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { configureStore } from "@reduxjs/toolkit";

export const rtkApi = createApi({
  reducerPath: "rtkApi",
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-entertainment-v1.enlight.diagnal.com',
    responseHandler: "text"
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<any, void>({
      query: () => '/content/filters/DOCUMENTARIES?origin=enhance&origin=vcms&source=enhance&region=IN&maxParentalRatings=UA&language=en-US&platform=web',
      
    }),
  }),
});

export const { useGetMoviesQuery } = rtkApi;

export const benchmarkStore = configureStore({
  reducer: { [rtkApi.reducerPath]: rtkApi.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkApi.middleware),
});