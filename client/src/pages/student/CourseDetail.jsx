





// import React from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import BuyCourseButton from "@/components/BuyCourseButton";
// import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
// import ReactPlayer from "react-player";

// const CourseDetail = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();

//   const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);

//   if (isLoading) return <h1 className="text-center mt-10">Loading...</h1>;
//   if (isError || !data) return <h1 className="text-center mt-10 text-red-500">Failed to load course details</h1>;

//   const { course, purchased } = data;
//   const firstLecture = course?.lectures?.[0];

//   const validVideoUrl =
//     firstLecture?.videoUrl &&
//     typeof firstLecture.videoUrl === "string" &&
//     firstLecture.videoUrl.startsWith("http");

//   const handleContinueCourse = () => {
//     navigate(`/course-progress/${courseId}`);
//   };

//   return (
//     <div className="mt-20 space-y-5 ml-5">
//       {/* Header */}
//       <div className="bg-[#2D2F31] text-white">
//         <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
//           <h1 className="font-bold text-2xl md:text-3xl">{course?.courseTitle}</h1>
//           <p className="text-base md:text-lg">{course?.subTitle || "No subtitle"}</p>
//           <p>
//             Created By{" "}
//             <span className="text-[#C0C4FC] underline italic">
//               {course?.creator?.name}
//             </span>
//           </p>
//           <div className="flex items-center gap-2 text-sm">
//             <BadgeInfo size={16} />
//           </div>
//           <p>Students enrolled: {course?.enrolledStudents?.length ?? 0}</p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
//         {/* Left - Description & Content */}
//         <div className="w-full lg:w-1/2 space-y-5">
//           <h1 className="font-bold text-xl md:text-2xl">Description</h1>
//           <p className="text-sm" dangerouslySetInnerHTML={{ __html: course.description }} />

//           <Card>
//             <CardHeader>
//               <CardTitle>Course Content</CardTitle>
//               <CardDescription>
//                 {course.lectures?.length || 0} lectures
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {course.lectures?.length > 0 ? (
//                 course.lectures.map((lecture, idx) => (
//                   <div key={idx} className="flex items-center gap-3 text-sm">
//                     <span>
//                       {purchased ? <PlayCircle size={14} /> : <Lock size={14} />}
//                     </span>
//                     <p>{lecture.lectureTitle}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-muted-foreground text-sm">No lectures available yet.</p>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right - Video + Purchase */}
//         <div className="w-full lg:w-1/3">
//           <Card>
//             <CardContent className="p-4 flex flex-col">
//               <div className="w-full aspect-video mb-5">
//                 {!firstLecture ? (
//                   <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground bg-muted rounded">
//                     No lectures to preview
//                   </div>
//                 ) : validVideoUrl ? (
//                   <ReactPlayer
//                     url={firstLecture.videoUrl}
//                     controls
//                     width="100%"
//                     height="100%"
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center text-sm text-red-500 bg-muted rounded">
//                     Invalid video URL: {firstLecture.videoUrl}
//                   </div>
//                 )}
//               </div>

//               {firstLecture?.lectureTitle && (
//                 <h1 className="text-lg font-semibold">{firstLecture.lectureTitle}</h1>
//               )}
//               <Separator className="my-2" />
//               <h1 className="text-lg md:text-xl font-semibold">
//                 Course Price: ₹{course.price ?? 0}
//               </h1>
//             </CardContent>

//             <CardFooter className="flex justify-center p-4">
//               {purchased ? (
//                 <Button onClick={handleContinueCourse} className="w-full">
//                   Continue Course
//                 </Button>
//               ) : (
//                 <BuyCourseButton courseId={courseId} />
//               )}
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;



import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import BuyCourseButton from "@/components/BuyCourseButton";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <h1 className="text-center mt-10">Loading...</h1>;
  if (isError || !data) return <h1 className="text-center mt-10 text-red-500">Failed to load course details</h1>;

  const { course, purchased } = data;
  const firstLecture = course?.lectures?.[0];

  const isValidVideo =
    firstLecture?.videoUrl &&
    typeof firstLecture.videoUrl === "string" &&
    firstLecture.videoUrl.startsWith("http");

  const handleContinueCourse = () => {
    navigate(`/course-progress/${courseId}`);
  };

  return (
    <div className=" space-y-5 ml-5">
      {/* Header Section */}
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">{course?.courseTitle}</h1>
          <p className="text-base md:text-lg">{course?.subTitle || "No subtitle"}</p>
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">
              {course?.creator?.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
          </div>
          <p>Students enrolled: {course?.enrolledStudents?.length ?? 0}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: course.description }}
          />

          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                {course.lectures?.length || 0} lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.lectures?.length > 0 ? (
                course.lectures.map((lecture, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <span>
                      {purchased ? <PlayCircle size={14} /> : <Lock size={14} />}
                    </span>
                    <p>{lecture.lectureTitle}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">No lectures available yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-5">
                {!firstLecture ? (
                  <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground bg-muted rounded">
                    No lectures to preview
                  </div>
                ) : isValidVideo ? (
                  <video
                    controls
                    className="w-full h-full rounded"
                    src={firstLecture.videoUrl}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-red-500 bg-muted rounded">
                    Invalid video URL
                  </div>
                )}
              </div>

              {firstLecture?.lectureTitle && (
                <h1 className="text-lg font-semibold">{firstLecture.lectureTitle}</h1>
              )}
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">
                Course Price: ₹{course.price ?? 0}
              </h1>
            </CardContent>

            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button onClick={handleContinueCourse} className="w-full">
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
