// import React from "react";
// import Course from "./Course";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useGetPublishedCourseQuery } from "@/features/api/courseApi";


// const Courses = () => {
//   const { data, isLoading, isError } = useGetPublishedCourseQuery();

//   if (isError) {
//     return (
//       <h1 className="text-center text-red-500 mt-10">
//         ❌ Failed to fetch published courses
//       </h1>
//     );
//   }

//   const publishedCourses = data?.courses || [];

//   return (
//     <div className="dark:bg-[#0A0A0A] bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto p-6">
//         <h2 className="text-3xl font-bold text-center mb-10">Our Courses</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {isLoading
//             ? Array.from({ length: 8 }).map((_, index) => (
//                 <CourseSkeleton key={index} />
//               ))
//             : publishedCourses.length > 0
//             ? publishedCourses.map((course) => (
//                 <Course key={course._id} course={course} />
//               ))
//             : (
//               <p className="col-span-full text-center text-gray-500">
//                 🚫 No published courses found.
//               </p>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Courses;

// const CourseSkeleton = () => (
//   <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
//     <Skeleton className="w-full h-36" />
//     <div className="px-5 py-4 space-y-3">
//       <Skeleton className="h-6 w-3/4" />
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <Skeleton className="h-6 w-6 rounded-full" />
//           <Skeleton className="h-4 w-20" />
//         </div>
//         <Skeleton className="h-4 w-16" />
//       </div>
//       <Skeleton className="h-4 w-1/4" />
//     </div>
//   </div>
// );




// pages/Courses.jsx
import React from "react";
import Course from "./Course";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();
  const publishedCourses = data?.courses || [];

  if (isError) {
    return <h1 className="text-center text-red-500 mt-10">❌ Failed to fetch published courses</h1>;
  }

  return (
    <div className="dark:bg-[#0A0A0A] bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-10">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => <CourseSkeleton key={index} />)
            : publishedCourses.length > 0
            ? publishedCourses.map((course) => <Course key={course._id} course={course} />)
            : <p className="col-span-full text-center text-gray-500">🚫 No published courses found.</p>}
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => (
  <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
    <Skeleton className="w-full h-36" />
    <div className="px-5 py-4 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-4 w-1/4" />
    </div>
  </div>
);
