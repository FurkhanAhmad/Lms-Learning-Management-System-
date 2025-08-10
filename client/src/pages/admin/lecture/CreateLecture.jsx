// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   useCreateLectureMutation,
//   useGetCourseLectureQuery,
// } from "@/features/api/courseApi";
// import { Loader2 } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "sonner";
// import Lecture from "./Lecture";

// const CreateLecture = () => {
//   const params = useParams();
//   const courseId = params.courseId;
//   const [lectureTitle, setlectureTitle] = useState("");

//   const navigate = useNavigate();

//   const [createLecture, { data, isLoading, isSuccess, error }] =
//     useCreateLectureMutation();
//   const {
//     data: LectureData,
//     isLoading: lectureLoading,
//     isError: lectureError,
//     refetch
//   } = useGetCourseLectureQuery(courseId);

//   const createLectureHandler = async () => {
//     await createLecture({ lectureTitle, courseId });
//   };

//   useEffect(() => {
//     if (isSuccess) {
//         refetch()
//       toast.success(data?.message || "Lecture created successfully");
//     }

//     if (error) {
//       const errorMessage =
//         error?.data?.message || error?.error || "Something went wrong";
//       toast.error(errorMessage);
//     }
//   }, [data, isSuccess, error]);
//   console.log(LectureData);

//   return (
//     <div className="flex-1 mx-10">
//       <div className="mb-4">
//         <h1 className="font-bold text">
//           Lets add lecture,add some basic details for your new lecture
//         </h1>
//         <p className="">
//           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias,
//           sequi?
//         </p>
//       </div>
//       <div className="space-y-4">
//         <div>
//           <Label>Title</Label>
//           <Input
//             type="text"
//             value={lectureTitle}
//             onChange={(e) => setlectureTitle(e.target.value)}
//             placeholder="Your Title Name"
//           />
//         </div>

//         <div className="flex items-center gap-2">
//           <Button
//             variant="outline"
//             onClick={() => {
//               navigate(`/admin/course/${courseId}`);
//             }}
//           >
//             Back to course
//           </Button>
//           <Button disabled={isLoading} onClick={createLectureHandler}>
//             {isLoading ? (
//               <>
//                 <Loader2 className="mr-2 h-4  w-4 animate-spin" />
//                 Please wait
//               </>
//             ) : (
//               "Create lecture"
//             )}
//           </Button>
//         </div>
//         <div className="mt-10">
//           {lectureLoading ? (
//             <p>Loading lecture...</p>
//           ) : lectureError ? (
//             <p>Failed to load lecture</p>
//           ) : LectureData.lectures.length === 0 ? (
//             <p>No Lecture available</p>
//           ) : (
//             LectureData.lectures.map((lecture,index)=>(
//             <Lecture key={lecture._id} lecture={lecture} courseId={courseId} index={index}/>
//             ))
           

//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateLecture;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const params = useParams();
  const courseId = params.courseId;
  const [lectureTitle, setlectureTitle] = useState("");

  const navigate = useNavigate();

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const {
    data: LectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data?.message || "Lecture created successfully");
    }

    if (error) {
      const errorMessage =
        error?.data?.message || error?.error || "Something went wrong";
      toast.error(errorMessage);
    }
  }, [data, isSuccess, error]);

  console.log("LectureData:", LectureData);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text">
          Let's add a lecture — fill in some basic details
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias,
          sequi?
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setlectureTitle(e.target.value)}
            placeholder="Your Title Name"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to course
          </Button>

          <Button disabled={isLoading} onClick={createLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create lecture"
            )}
          </Button>
        </div>

        <div className="mt-10">
          {lectureLoading ? (
            <p>Loading lecture...</p>
          ) : lectureError ? (
            <p>Failed to load lecture</p>
          ) : !LectureData?.lectures || LectureData.lectures.length === 0 ? (
            <p>No Lecture available</p>
          ) : (
            LectureData.lectures.map((lecture, index) => (
              <Lecture
                key={lecture._id}
                lecture={lecture}
                courseId={courseId}
                index={index}
             
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
