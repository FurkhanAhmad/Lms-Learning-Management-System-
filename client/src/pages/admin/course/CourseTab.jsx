

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "sonner";
// import {
//   useEditCourseMutation,
//   useGetCourseByIdQuery,
//   usePublishCourseMutation,
//   useGetCourseLectureQuery,
//   useRemoveLectureMutation,
// } from "@/features/api/courseApi";

// import RichTextEditor from "@/components/RichTextEditor";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Loader2, Trash2 } from "lucide-react";

// const CourseTab = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();

//   const {
//     data: courseData,
//     isLoading: courseLoading,
//     refetch: refetchCourse,
//   } = useGetCourseByIdQuery(courseId, { skip: !courseId });

//   const {
//     data: lectureData,
//     isLoading: lectureLoading,
//     refetch: refetchLecture,
//   } = useGetCourseLectureQuery(courseId, { skip: !courseId });

//   const [editCourse, { isLoading, isSuccess, error, data }] = useEditCourseMutation();
//   const [publishCourse] = usePublishCourseMutation();
//   const [removeLecture] = useRemoveLectureMutation();

//   const [input, setInput] = useState({
//     courseTitle: "",
//     subTitle: "",
//     description: "",
//     category: "",
//     courseLevel: "",
//     coursePrice: "",
//     courseThumbnail: "",
//   });

//   const [previewThumbnail, setPreviewThumbnail] = useState("");

//   useEffect(() => {
//     const course = courseData?.course;
//     if (course) {
//       setInput({
//         courseTitle: course.courseTitle,
//         subTitle: course.subTitle,
//         description: course.description,
//         category: course.category,
//         courseLevel: course.courseLevel,
//         coursePrice: course.price?.toString(),
//         courseThumbnail: "",
//       });
//       setPreviewThumbnail(course.courseThumbnail);
//     }
//   }, [courseData]);

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success(data?.message || "Course updated");
//       refetchCourse();
//     } else if (error) {
//       toast.error(error?.data?.message || "Failed to update course");
//     }
//   }, [isSuccess, error]);

//   const changeHandler = (e) => {
//     const { name, value } = e.target;
//     setInput((prev) => ({ ...prev, [name]: value }));
//   };

//   const selectThumbnail = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setInput((prev) => ({ ...prev, courseThumbnail: file }));
//       const reader = new FileReader();
//       reader.onloadend = () => setPreviewThumbnail(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const updateCourseHandler = async () => {
//     const formData = new FormData();
//     formData.append("courseTitle", input.courseTitle);
//     formData.append("subTitle", input.subTitle);
//     formData.append("description", input.description);
//     formData.append("category", input.category);
//     formData.append("courseLevel", input.courseLevel);
//     formData.append("price", input.coursePrice);
//     if (input.courseThumbnail) {
//       formData.append("courseThumbnail", input.courseThumbnail);
//     }
//     await editCourse({ courseId, formData });
//   };

//   const togglePublish = async (action) => {
//     try {
//       const res = await publishCourse({ courseId, query: action }).unwrap();
//       toast.success(res?.message || "Status updated");
//       refetchCourse();
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to update status");
//     }
//   };

//   const handleDeleteLecture = async (lectureId) => {
//     try {
//       await removeLecture({ courseId, lectureId }).unwrap();
//       toast.success("Lecture removed");
//       refetchLecture();
//     } catch (err) {
//       toast.error(err?.data?.message || "Delete failed");
//     }
//   };

//   if (courseLoading) return <p className="ml-3 mt-3">Loading...</p>;

//   return (
//     <Card className="ml-3">
//       <CardHeader className="flex justify-between">
//         <div>
//           <CardTitle>Course Info</CardTitle>
//           <CardDescription>Update and publish your course.</CardDescription>
//         </div>
//         <div className="flex gap-2">
//           <Button
//             disabled={!courseData?.course?.lectures?.length}
//             variant="outline"
//             onClick={() => togglePublish(courseData.course.isPublished ? "false" : "true")}
//           >
//             {courseData.course.isPublished ? "Unpublish" : "Publish"}
//           </Button>
//           <Button variant="destructive">Remove Course</Button>
//         </div>
//       </CardHeader>

//       <CardContent className="space-y-4 mt-5">
//         <div>
//           <Label>Title</Label>
//           <Input name="courseTitle" value={input.courseTitle} onChange={changeHandler} />
//         </div>
//         <div>
//           <Label>Sub Title</Label>
//           <Input name="subTitle" value={input.subTitle} onChange={changeHandler} />
//         </div>
//         <div>
//           <Label>Description</Label>
//           <RichTextEditor input={input} setInput={setInput} />
//         </div>

//         <div className="flex gap-5 flex-wrap">
//           <div>
//             <Label>Category</Label>
//             <Select value={input.category} onValueChange={(v) => setInput(p => ({ ...p, category: v }))}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup>
//                   {["Next Js", "Frontend Development", "Fullstack Development", "Python", "MongoDB"].map(cat => (
//                     <SelectItem key={cat} value={cat}>{cat}</SelectItem>
//                   ))}
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <Label>Level</Label>
//             <Select value={input.courseLevel} onValueChange={(v) => setInput(p => ({ ...p, courseLevel: v }))}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Level" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup>
//                   {["Beginner", "Medium", "Advance"].map(lvl => (
//                     <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>
//                   ))}
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <Label>Price</Label>
//             <Input type="number" name="coursePrice" value={input.coursePrice} onChange={changeHandler} />
//           </div>
//         </div>

//         <div>
//           <Label>Thumbnail</Label>
//           <Input type="file" onChange={selectThumbnail} />
//           {previewThumbnail && (
//             <img src={previewThumbnail} alt="Preview" className="my-2 w-40 rounded-md" />
//           )}
//         </div>

//         <div className="flex gap-2">
//           <Button variant="outline" onClick={() => navigate("/admin/course")}>Cancel</Button>
//           <Button disabled={isLoading} onClick={updateCourseHandler}>
//             {isLoading ? <><Loader2 className="animate-spin mr-2 h-4 w-4" />Saving</> : "Save"}
//           </Button>
//         </div>

//         {/* ✅ LECTURES LIST */}
//         <div className="mt-10">
//           <h2 className="text-xl font-semibold mb-2">Lectures</h2>
//           {lectureLoading ? (
//             <p>Loading lectures...</p>
//           ) : lectureData?.lectures?.length > 0 ? (
//             <div className="space-y-4">
//               {lectureData.lectures.map((lecture) => (
//                 <div key={lecture._id} className="border rounded p-3 flex justify-between items-center">
//                   <div>
//                     <p className="font-medium">{lecture.lectureTitle}</p>
//                     <p className="text-sm text-gray-500">{lecture.isPreviewFree ? "Preview Available" : "Paid"}</p>
//                   </div>
//                   <Button
//                     variant="ghost"
//                     className="text-red-600"
//                     onClick={() => handleDeleteLecture(lecture._id)}
//                   >
//                     <Trash2 size={18} />
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p>No lectures added yet.</p>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default CourseTab;





import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
  useGetCourseLectureQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";

import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Trash2 } from "lucide-react";

const CourseTab = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const {
    data: courseData,
    isLoading: courseLoading,
    refetch: refetchCourse,
  } = useGetCourseByIdQuery(courseId, { skip: !courseId });

  const {
    data: lectureData,
    isLoading: lectureLoading,
    refetch: refetchLecture,
  } = useGetCourseLectureQuery(courseId, { skip: !courseId });

  const [editCourse, { isLoading, isSuccess, error, data }] = useEditCourseMutation();
  const [publishCourse] = usePublishCourseMutation();
  const [removeLecture] = useRemoveLectureMutation();

  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const [previewThumbnail, setPreviewThumbnail] = useState("");

  useEffect(() => {
    const course = courseData?.course;
    if (course) {
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.price?.toString(),
        courseThumbnail: "",
      });
      setPreviewThumbnail(course.courseThumbnail);
    }
  }, [courseData]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course updated");
      refetchCourse();
    } else if (error) {
      toast.error(error?.data?.message || "Failed to update course");
    }
  }, [isSuccess, error]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput((prev) => ({ ...prev, courseThumbnail: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewThumbnail(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // const updateCourseHandler = async () => {
  //   if (!courseId) return toast.error("Invalid course ID");

  //   const formData = new FormData();
  //   formData.append("courseTitle", input.courseTitle);
  //   formData.append("subTitle", input.subTitle);
  //   formData.append("description", input.description);
  //   formData.append("category", input.category);
  //   formData.append("courseLevel", input.courseLevel);
  //   formData.append("price", input.coursePrice);
  //     formData.append("file", thumbnail);
  //   if (input.courseThumbnail) {
  //     formData.append("courseThumbnail", input.courseThumbnail);
  //   }

  //   await editCourse({ courseId, formData });
  // };


  const updateCourseHandler = async () => {
  if (!courseId) return toast.error("Invalid course ID");

  const formData = new FormData();
  formData.append("courseTitle", input.courseTitle);
  formData.append("subTitle", input.subTitle);
  formData.append("description", input.description);
  formData.append("category", input.category);
  formData.append("courseLevel", input.courseLevel);
  formData.append("price", Number(input.coursePrice));

  // Append thumbnail only if user has selected a new one
  if (input.courseThumbnail) {
    formData.append("file", input.courseThumbnail);
  }

  await editCourse({ courseId, formData });
};


  const togglePublish = async () => {
    if (!courseId) return toast.error("Invalid course ID");

    try {
      const res = await publishCourse({
        courseId,
        query: courseData.course.isPublished ? "false" : "true",
      }).unwrap();
      toast.success(res.message || "Status updated");
      refetchCourse();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update publish status");
    }
  };

  const handleDeleteLecture = async (lectureId) => {
    try {
      await removeLecture({ courseId, lectureId }).unwrap();
      toast.success("Lecture removed");
      refetchLecture();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete lecture");
    }
  };

  if (courseLoading) return <p className="ml-3 mt-3">Loading...</p>;

  return (
    <Card className="ml-3">
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Course Info</CardTitle>
          <CardDescription>Update and publish your course.</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button
            disabled={!courseData?.course?.lectures?.length}
            variant="outline"
            onClick={togglePublish}
          >
            {courseData.course.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button variant="destructive">Remove Course</Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 mt-5">
        <div>
          <Label>Title</Label>
          <Input
            name="courseTitle"
            value={input.courseTitle}
            onChange={changeHandler}
            placeholder="Ex. Fullstack Developer"
          />
        </div>
        <div>
          <Label>Sub Title</Label>
          <Input
            name="subTitle"
            value={input.subTitle}
            onChange={changeHandler}
            placeholder="Ex. Zero to Hero journey"
          />
        </div>
        <div>
          <Label>Description</Label>
          <RichTextEditor input={input} setInput={setInput} />
        </div>

        <div className="flex gap-5 flex-wrap">
          <div>
            <Label>Category</Label>
            <Select
              value={input.category}
              onValueChange={(val) => setInput((p) => ({ ...p, category: val }))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[
                    "Next Js",
                    "Frontend Development",
                    "Fullstack Development",
                    "Python",
                    "MongoDB",
                  ].map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Level</Label>
            <Select
              value={input.courseLevel}
              onValueChange={(val) => setInput((p) => ({ ...p, courseLevel: val }))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {["Beginner", "Medium", "Advance"].map((lvl) => (
                    <SelectItem key={lvl} value={lvl}>
                      {lvl}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Price</Label>
            <Input
              type="number"
              name="coursePrice"
              value={input.coursePrice}
              onChange={changeHandler}
              placeholder="199"
              className="w-[120px]"
            />
          </div>
        </div>

        <div>
          <Label>Course Thumbnail</Label>
          <Input type="file" accept="image/*" onChange={selectThumbnail} />
          {previewThumbnail && (
            <img src={previewThumbnail} alt="Preview" className="my-2 w-40 rounded-md" />
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/course")}>
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={updateCourseHandler}>
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" /> Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>

        {/* LECTURES */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">Lectures</h2>
          {lectureLoading ? (
            <p>Loading lectures...</p>
          ) : lectureData?.lectures?.length > 0 ? (
            <div className="space-y-4">
              {lectureData.lectures.map((lecture) => (
                <div
                  key={lecture._id}
                  className="border rounded p-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{lecture.lectureTitle}</p>
                    <p className="text-sm text-gray-500">
                      {lecture.isPreviewFree ? "Preview Available" : "Paid"}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-red-600"
                    onClick={() => handleDeleteLecture(lecture._id)}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p>No lectures added yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
