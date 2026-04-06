import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { configureStore } from "@reduxjs/toolkit";

export const rtkApi = createApi({
  reducerPath: "rtkApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getMovies: builder.query<any, { genre: string; lang: string }>({
      query: ({ genre, lang }) => ({
        url: `https://api-entertainment-v1.enlight.diagnal.com/content/filters/${genre}`,
        params: {
          origin: "enhance",
          source: "enhance",
          region: "IN",
          maxParentalRatings: "UA",
          language: lang,
          platform: "web",
        },
      }),
    }),
    getMoviesNoParse: builder.query<any, { genre: string; lang: string }>({
      query: ({ genre, lang }) => ({
        url: `https://api-entertainment-v1.enlight.diagnal.com/content/filters/${genre}`,
        responseHandler: "text",
        params: {
          origin: "enhance",
          source: "enhance",
          region: "IN",
          maxParentalRatings: "UA",
          language: lang,
          platform: "web",
        },
      }),
    }),
    createPost: builder.mutation<any, any>({
      query: (body) => ({
        url: "https://jsonplaceholder.typicode.com/posts",
        method: "POST",
        body,
      }),
    }),
    updatePost: builder.mutation<any, { id: number | string; body: any }>({
      query: ({ id, body }) => ({
        url: `https://jsonplaceholder.typicode.com/posts/${id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useLazyGetMoviesQuery, useLazyGetMoviesNoParseQuery } = rtkApi;

export const benchmarkStore = configureStore({
  reducer: { [rtkApi.reducerPath]: rtkApi.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkApi.middleware),
});
