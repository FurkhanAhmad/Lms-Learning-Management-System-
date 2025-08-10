// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const COURSE_PUCHASE_API="http://localhost:8080/api/v1/purchase";

// export const purchaseApi=createApi({
//    reducerPath:"purchaseApi",
//    baseQuery:fetchBaseQuery({
//     baseUrl:COURSE_PUCHASE_API,
//     credentials:'include'
//    }),
//    endpoints:(builder)=>({
//     createChecKoutSession:builder.mutation({
//         query:(courseId)=>({
//             url:"/checkout/create-checkout-session",
//             method:"POST",
//             body:{courseId}
//         })
//     })
//    })

// })

// export  const {useCreateChecKoutSessionMutation}=purchaseApi

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PUCHASE_API = "http://localhost:8080/api/v1/purchase";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PUCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createChecKoutSession: builder.mutation({
      query: ({courseId}) => ({
        url: "/checkout/create-checkout-session",
        method: "POST",
        body: {courseId}, // pass as { courseId }
      }),
    }),
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),
    getPurchasedCourses: builder.query({
      query: () => ({
        url: ``,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateChecKoutSessionMutation,
  useGetCourseDetailWithStatusQuery,
  useGetPurchasedCoursesQuery,
} = purchaseApi;
