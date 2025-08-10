// // import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// // import { userLoggedIn, userLoggedOut } from "../authSlice";
// const USESR_API = "http://localhost:8080/api/v1/user/";

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { userLoggedIn, userLoggedOut } from "../authSlice";

// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:8080/api/v1/user/",
//     credentials: "include", // Ensures cookies are sent
//   }),
//   endpoints: (builder) => ({
//     // ✅ Register User
//     registerUser: builder.mutation({
//       query: (input) => ({
//         url: "register",
//         method: "POST",
//         body: input,
//       }),
//     }),

//     // ✅ Login User
//     loginUser: builder.mutation({
//       query: (input) => ({
//         url: "login",
//         method: "POST",
//         body: input,
//       }),
//       async onQueryStarted(_, { queryFulfilled, dispatch }) {
//         try {
//           const { data } = await queryFulfilled;
//           dispatch(userLoggedIn({ user: data.user }));
//         } catch (err) {
//           console.error("Login failed", err);
//         }
//       },
//     }),

//     // ✅ Load Authenticated User
//     loadUser: builder.query({
//       query: () => ({ url: "profile", method: "GET" }),
//       async onQueryStarted(_, { queryFulfilled, dispatch }) {
//         try {
//           const { data } = await queryFulfilled;
//           dispatch(userLoggedIn({ user: data.user }));
//         } catch (err) {
//           console.error("Load user failed", err);
//         }
//       },
//     }),

//     // ✅ Logout
//     logoutUser: builder.mutation({
//       query: () => ({ url: "logout", method: "GET" }),
//       async onQueryStarted(_, { dispatch }) {
//         dispatch(userLoggedOut());
//       },
//     }),

//     // ✅ Update User Profile
//     updateUser: builder.mutation({
//       query: (formData) => ({
//         url: "profile/update",
//         method: "PUT",
//         body: formData,
//       }),
//     }),
//   }),
// });

// // ✅ Export hooks
// export const {
//   useRegisterUserMutation,
//   useLoginUserMutation,
//   useLoadUserQuery,
//   useLogoutUserMutation,
//   useUpdateUserMutation,
// } = authApi;


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/user",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (input) => ({
        url: "register",
        method: "POST",
        body: input,
      }),
    }),
    loginUser: builder.mutation({
      query: (input) => ({
        url: "login",
        method: "POST",
        body: input,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userLoggedIn({ user: data.user }));
        } catch (err) {
          console.error("Login failed", err);
        }
      },
    }),
    loadUser: builder.query({
      query: () => ({ url: "profile", method: "GET" }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userLoggedIn({ user: data.user }));
        } catch (err) {
          console.error("Load user failed", err);
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({ url: "logout", method: "GET" }),
      async onQueryStarted(_, { dispatch }) {
        dispatch(userLoggedOut());
      },
    }),
    updateUser: builder.mutation({
      query: (formData) => ({
        url: "profile/update",
        method: "PUT",
        body: formData,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLoadUserQuery,
  useLogoutUserMutation,
  useUpdateUserMutation, // ✅ FIXED: properly exported now
} = authApi;
