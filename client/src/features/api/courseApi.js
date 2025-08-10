import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:8080/api/v1";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch_Creator_Course", "Refetch_Lecture"],

  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    // CREATE COURSE
    createCourse: builder.mutation({
      query: (formData) => ({
        url: "/course/create",
        method: "POST",
        body:formData,
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),



//  getSearchedCourses: builder.query({
//       query: ({ searchQuery, categories, sortByPrice }) => {
//         // Build the query string
//         let queryString = `/search?query=${encodeURIComponent(searchQuery)}`;

//         // Append categories if available
//         if (categories && categories.length > 0) {
//           const categoriesString = categories.map(encodeURIComponent).join(",");
//           queryString += `&categories=${categoriesString}`;
//         }

//         // Append sortByLevel if available
        
//         if (sortByPrice) {
//           queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
//         }

//         return {
//           url: queryString,
//           method: "GET",
//           credentials: "include",
//         };
//       },
//     }),


getSearchedCourses: builder.query({
  query: ({ searchQuery, categories, sortByPrice }) => {
    let queryString = `/course/search?query=${encodeURIComponent(searchQuery)}`;

    if (categories?.length) {
      queryString += `&categories=${categories.map(encodeURIComponent).join(",")}`;
    }

    if (sortByPrice) {
      queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
    }

    return {
      url: queryString,
      method: "GET",
      credentials: "include",
    };
  },
}),




    // GET ALL PUBLISHED COURSES
    getPublishedCourse: builder.query({
      query: () => ({
        url:  "/course/published",
        method: "GET",
      }),
    }),

    // GET CREATOR COURSES
    getCreatorCourse: builder.query({
      query: () => ({
        url: "/course/creator-course",
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Course"],
    }),

    // GET COURSE BY ID
    getCourseById: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}`,
        method: "GET",
      }),
    }),

    // EDIT COURSE (FormData)
    editCourse: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/course/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),

    // PUBLISH / UNPUBLISH COURSE
    publishCourse: builder.mutation({
      query: ({ courseId, query }) => ({
        url: `/course/publish/${courseId}?publish=${query}`,
        method: "PUT",
      }),
    }),


    // CREATE LECTURE




    
    createLecture: builder.mutation({
      query: ({ lectureTitle, videoUrl, publicId, isPreviewFree, courseId }) => ({
        url: `/course/${courseId}/lecture`,
        method: "POST",
        body: { lectureTitle, videoUrl, publicId, isPreviewFree },
      }),
      invalidatesTags: ["Refetch_Lecture"],
    }),

    // GET LECTURES
    getCourseLecture: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/lectures`,
        method: "GET",
      }),
      providesTags: ["Refetch_Lecture"],
    }),

    // EDIT LECTURE (Optional — if implemented)
    editLecture: builder.mutation({
      query: ({ courseId, lectureId, payload }) => ({
        url: `/course/${courseId}/lecture/${lectureId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Refetch_Lecture"],
    }),

    // REMOVE LECTURE
    removeLecture: builder.mutation({
      query: ({ courseId, lectureId }) => ({
        url: `/course/${courseId}/lecture/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Lecture"],
    }),

    // GET LECTURE BY ID
    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `/course/lecture/${lectureId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetSearchedCoursesQuery,
  useGetPublishedCourseQuery,
  useGetCreatorCourseQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  usePublishCourseMutation,
} = courseApi;
