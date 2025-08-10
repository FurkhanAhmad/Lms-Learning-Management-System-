





// // import React, { useEffect, useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Switch } from "@/components/ui/switch";
// // import { Label } from "@/components/ui/label";
// // import axios from "axios";
// // import { toast } from "sonner";
// // import { Progress } from "@/components/ui/progress";
// // import {
// //   useEditLectureMutation,
// //   useGetLectureByIdQuery,
// //   useRemoveLectureMutation,
// // } from "@/features/api/courseApi";
// // import { useParams, useNavigate } from "react-router-dom";

// // const MEDIA_API = "http://localhost:8080/api/v1/media";

// // const LectureTab = () => {
// //   const [lectureTitle, setLectureTitle] = useState("");
// //   const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
// //   const [isFree, setIsFree] = useState(false);
// //   const [mediaProgress, setMediaProgress] = useState(false);
// //   const [uploadProgress, setUploadProgress] = useState(0);
// //   const [btnDisable, setBtnDisable] = useState(true);

// //   const { courseId, lectureId } = useParams();
// //   const navigate = useNavigate();

// //   // ✅ Lecture Fetch
// //   const {
// //     data: lectureData,
// //     isLoading: lectureLoading,
// //     isError: lectureError,
// //   } = useGetLectureByIdQuery(lectureId);

// //   // ✅ Edit Mutation
// //   const [editLecture, { data: editData, isLoading: editLoading, error: editError, isSuccess: editSuccess }] =
// //     useEditLectureMutation();

// //   // ✅ Remove Mutation
// //   const [removeLecture, { data: removeData, isSuccess: removeSuccess, isLoading: removeLoading }] =
// //     useRemoveLectureMutation();

// //   // ✅ Set initial form values when data is fetched
// //   useEffect(() => {
// //     if (lectureData?.lecture) {
// //       setLectureTitle(lectureData.lecture.lectureTitle);
// //       setIsFree(lectureData.lecture.isPreviewFree);
// //       setUploadVideoInfo(lectureData.lecture.videoInfo || {});
// //     }
// //   }, [lectureData]);

// //   // ✅ Handle lecture edit
// //   const handleEditLecture = async () => {
// //     await editLecture({
// //       lectureTitle,
// //       uploadVideoInfo,
// //       isPreviewFree: isFree,
// //       courseId,
// //       lectureId,
// //     });
// //   };

// //   // ✅ Handle lecture delete
// //   const handleRemoveLecture = async () => {
// //     await removeLecture({ courseId, lectureId });
// //   };

// //   // ✅ Show success/error messages for edit
// //   useEffect(() => {
// //     if (editSuccess) {
// //       toast.success(editData?.message || "Lecture updated successfully");
// //     }
// //     if (editError) {
// //       toast.error(editError?.data?.message || "Something went wrong");
// //     }
// //   }, [editSuccess, editError, editData]);

// //   // ✅ Show success message for delete
// //  useEffect(() => {
// //   if (removeSuccess) {
// //     toast.success(removeData?.message || "Lecture removed");
// //   }
// // }, [removeSuccess, removeData, navigate, courseId]);


// //   // ✅ Upload Video Handler
// //   const fileChangeHandler = async (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       const formData = new FormData();
// //       formData.append("file", file);
// //       setMediaProgress(true);
// //       try {
// //         const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
// //           onUploadProgress: ({ loaded, total }) => {
// //             setUploadProgress(Math.round((loaded * 100) / total));
// //           },
// //         });
// //         if (res.data.success) {
// //           setUploadVideoInfo({
// //             videoUrl: res.data.url,
// //             publicId: res.data.data.public_id,
// //           });
// //           setBtnDisable(false);
// //           toast.success(res.data.message || "Video uploaded successfully");
// //         }
// //       } catch (error) {
// //         toast.error("Video upload failed");
// //       } finally {
// //         setMediaProgress(false);
// //       }
// //     }
// //   };

// //   return (
// //     <Card>
// //       <CardHeader className="flex justify-between">
// //         <div>
// //           <CardTitle>Edit Lecture</CardTitle>
// //           <CardDescription>
// //             Make changes and click save when done
// //           </CardDescription>
// //         </div>
// //         <div className="flex items-center gap-2">
// //           <Button
// //             variant="destructive"
// //             onClick={handleRemoveLecture}
// //             disabled={removeLoading}
// //           >
// //             {removeLoading ? "Removing..." : "Remove Lecture"}
// //           </Button>
// //         </div>
// //       </CardHeader>

// //       <CardContent>
// //         <div>
// //           <label>Title</label>
// //           <Input
// //             type="text"
// //             placeholder="Ex. Introduction to JavaScript"
// //             value={lectureTitle}
// //             onChange={(e) => setLectureTitle(e.target.value)}
// //           />
// //         </div>

// //         <div className="my-5">
// //           <label>
// //             Video <span className="text-red-500">*</span>
// //           </label>
// //           <Input
// //             type="file"
// //             accept="video/*"
// //             onChange={fileChangeHandler}
// //             className="w-fit"
// //           />
// //         </div>

// //         <div className="flex items-center space-x-2 my-5">
// //           <Switch
// //             id="is-free"
// //             checked={isFree}
// //             onCheckedChange={setIsFree}
// //           />
// //           <Label htmlFor="is-free">Is this video FREE</Label>
// //         </div>

// //         {mediaProgress && (
// //           <div className="my-4">
// //             <Progress value={uploadProgress} />
// //             <p>{uploadProgress}% uploaded</p>
// //           </div>
// //         )}

// //         <div className="mt-4">
// //           <Button
// //             onClick={handleEditLecture}
// //             disabled={btnDisable || editLoading}
// //           >
// //             {editLoading ? "Updating..." : "Update Lecture"}
// //           </Button>
// //         </div>
// //       </CardContent>
// //     </Card>
// //   );
// // };

// // export default LectureTab;




// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
// import { Progress } from "@/components/ui/progress";
// import { toast } from "sonner";
// import axios from "axios";
// import {
//   useEditLectureMutation,
//   useGetLectureByIdQuery,
//   useRemoveLectureMutation,
// } from "@/features/api/courseApi";
// import { useParams, useNavigate } from "react-router-dom";

// const MEDIA_API = "http://localhost:8080/api/v1/media";

// const LectureTab = () => {
//   const { courseId, lectureId } = useParams();
//   const navigate = useNavigate();

//   const [lectureTitle, setLectureTitle] = useState("");
//   const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
//   const [isFree, setIsFree] = useState(false);
//   const [mediaProgress, setMediaProgress] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const {
//     data: lectureData,
//     isLoading: lectureLoading,
//     isError: lectureError,
//   } = useGetLectureByIdQuery(lectureId);

//   const [editLecture, { isLoading: editLoading, isSuccess: editSuccess, error: editError, data: editData }] =
//     useEditLectureMutation();

//   const [removeLecture, { isLoading: removeLoading, isSuccess: removeSuccess, data: removeData }] =
//     useRemoveLectureMutation();

//   useEffect(() => {
//     if (lectureData?.lecture) {
//       const { lectureTitle, isPreviewFree, videoUrl, publicId } = lectureData.lecture;
//       setLectureTitle(lectureTitle || "");
//       setIsFree(isPreviewFree || false);
//       if (videoUrl && publicId) {
//         setUploadVideoInfo({ videoUrl, publicId });
//       }
//     }
//   }, [lectureData]);

//   const handleEditLecture = async () => {
//     if (!lectureTitle.trim()) return toast.error("Lecture title is required");
//     if (!uploadVideoInfo?.videoUrl || !uploadVideoInfo?.publicId)
//       return toast.error("Video upload is required");

//     // await editLecture({
//     //   lectureTitle,
//     //   uploadVideoInfo,
//     //   isPreviewFree: isFree,
//     //   courseId,
//     //   lectureId,
//     // });
// await editLecture({
//   courseId,
//   lectureId,
//   payload: {
//     lectureTitle,
//     isPreviewFree: isFree,
//     uploadVideoInfo,
//   },
// });


//   };


 


//   const handleRemoveLecture = async () => {
//     await removeLecture({ courseId, lectureId });
//   };

//   useEffect(() => {
//     if (editSuccess) {
//       toast.success(editData?.message || "Lecture updated successfully");
//     }
//     if (editError) {
//       toast.error(editError?.data?.message || "Update failed");
//     }
//   }, [editSuccess, editError, editData]);

//   useEffect(() => {
//     if (removeSuccess) {
//       toast.success(removeData?.message || "Lecture removed");
//       navigate(`/admin/course/${courseId}/lecture`);
//     }
//   }, [removeSuccess, removeData, navigate, courseId]);

//   const fileChangeHandler = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);
//     setMediaProgress(true);
//     setUploadProgress(0);

//     try {
//       const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
//         onUploadProgress: ({ loaded, total }) => {
//           setUploadProgress(Math.round((loaded * 100) / total));
//         },
//       });

//       if (res.data.success && res.data.url && res.data.data?.public_id) {
//         setUploadVideoInfo({
//           videoUrl: res.data.url,
//           publicId: res.data.data.public_id,
//         });
//         toast.success("Video uploaded successfully");
//       } else {
//         toast.error("Failed to upload video");
//       }
//     } catch (err) {
//       toast.error("Video upload failed");
//     } finally {
//       setMediaProgress(false);
//     }
//   };

//   const isVideoMissing = !uploadVideoInfo?.videoUrl || !uploadVideoInfo?.publicId;
//   const isFormInvalid = lectureLoading || !lectureTitle.trim() || isVideoMissing || editLoading;

//   if (lectureLoading) {
//     return <p className="text-center py-10 text-muted-foreground">Loading lecture...</p>;
//   }

//   return (
//     <Card>
//       <CardHeader className="flex justify-between">
//         <div>
//           <CardTitle>Edit Lecture</CardTitle>
//           <CardDescription>All fields are required. Upload a video before saving.</CardDescription>
//         </div>
//         <Button variant="destructive" onClick={handleRemoveLecture} disabled={removeLoading}>
//           {removeLoading ? "Removing..." : "Remove Lecture"}
//         </Button>
//       </CardHeader>

//       <CardContent className="space-y-4">
//         <div>
//           <Label>Title <span className="text-red-500">*</span></Label>
//           <Input
//             type="text"
//             placeholder="e.g., Introduction to React"
//             value={lectureTitle}
//             onChange={(e) => setLectureTitle(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <Label>Upload Video <span className="text-red-500">*</span></Label>
//           <Input
//             type="file"
//             accept="video/*"
//             onChange={fileChangeHandler}
//             className="w-fit"
//             required
//           />
//         </div>

//         {uploadVideoInfo?.videoUrl && (
//           <video
//             src={uploadVideoInfo.videoUrl}
//             controls
//             className="mt-2 max-w-full rounded-md border"
//           />
//         )}

//         {mediaProgress && (
//           <div>
//             <Progress value={uploadProgress} />
//             <p className="text-sm text-muted-foreground">{uploadProgress}% uploaded</p>
//           </div>
//         )}

//         <div className="flex items-center space-x-2">
//           <Switch id="is-free" checked={isFree} onCheckedChange={setIsFree} />
//           <Label htmlFor="is-free">Is this video free?</Label>
//         </div>

//         <div>
//           <Button onClick={handleEditLecture} disabled={isFormInvalid}>
//             {editLoading ? "Updating..." : "Update Lecture"}
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default LectureTab;





import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import axios from "axios";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import { useParams, useNavigate } from "react-router-dom";

const MEDIA_API = "http://localhost:8080/api/v1/media";

const LectureTab = () => {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();

  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
  } = useGetLectureByIdQuery(lectureId);

  const [editLecture, { isLoading: editLoading, isSuccess: editSuccess, error: editError, data: editData }] =
    useEditLectureMutation();

  const [removeLecture, { isLoading: removeLoading, isSuccess: removeSuccess, data: removeData }] =
    useRemoveLectureMutation();

  useEffect(() => {
    if (lectureData?.lecture) {
      const { lectureTitle, isPreviewFree, videoUrl, publicId } = lectureData.lecture;
      setLectureTitle(lectureTitle || "");
      setIsFree(isPreviewFree || false);
      if (videoUrl && publicId) {
        setUploadVideoInfo({ videoUrl, publicId });
      }
    }
  }, [lectureData]);

  const handleEditLecture = async () => {
    if (!lectureTitle.trim()) return toast.error("Lecture title is required");
    if (!uploadVideoInfo?.videoUrl || !uploadVideoInfo?.publicId)
      return toast.error("Video upload is required");

    await editLecture({
      courseId,
      lectureId,
      payload: {
        lectureTitle,
        isPreviewFree: isFree,
        uploadVideoInfo,
      },
    });
  };

  const handleRemoveLecture = async () => {
    await removeLecture({ courseId, lectureId });
  };

  useEffect(() => {
    if (editSuccess) {
      toast.success(editData?.message || "Lecture updated successfully");
    }
    if (editError) {
      toast.error(editError?.data?.message || "Update failed");
    }
  }, [editSuccess, editError, editData]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData?.message || "Lecture removed");
      navigate(`/admin/course/${courseId}/lecture`);
    }
  }, [removeSuccess, removeData, navigate, courseId]);

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setMediaProgress(true);
    setUploadProgress(0);

    try {
      const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: ({ loaded, total }) => {
          setUploadProgress(Math.round((loaded * 100) / total));
        },
      });

      if (res.data.success && res.data.url && res.data.public_id) {
        setUploadVideoInfo({
          videoUrl: res.data.url,
          publicId: res.data.public_id,
        });
        toast.success("Video uploaded successfully");
      } else {
        toast.error("Failed to upload video");
      }
    } catch (err) {
      toast.error("Video upload failed");
    } finally {
      setMediaProgress(false);
    }
  };

  const isVideoMissing = !uploadVideoInfo?.videoUrl || !uploadVideoInfo?.publicId;
  const isFormInvalid = lectureLoading || !lectureTitle.trim() || isVideoMissing || editLoading;

  if (lectureLoading) {
    return <p className="text-center py-10 text-muted-foreground">Loading lecture...</p>;
  }

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>All fields are required. Upload a video before saving.</CardDescription>
        </div>
        <Button variant="destructive" onClick={handleRemoveLecture} disabled={removeLoading}>
          {removeLoading ? "Removing..." : "Remove Lecture"}
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label>Title <span className="text-red-500">*</span></Label>
          <Input
            type="text"
            placeholder="e.g., Introduction to React"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Upload Video <span className="text-red-500">*</span></Label>
          <Input
            type="file"
            accept="video/*"
            onChange={fileChangeHandler}
            className="w-fit"
            required
          />
        </div>

        {uploadVideoInfo?.videoUrl && (
          <video
            src={uploadVideoInfo.videoUrl}
            controls
            className="mt-2 max-w-full rounded-md border"
          />
        )}

        {mediaProgress && (
          <div>
            <Progress value={uploadProgress} />
            <p className="text-sm text-muted-foreground">{uploadProgress}% uploaded</p>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Switch id="is-free" checked={isFree} onCheckedChange={setIsFree} />
          <Label htmlFor="is-free">Is this video free?</Label>
        </div>

        <div>
          <Button onClick={handleEditLecture} disabled={isFormInvalid}>
            {editLoading ? "Updating..." : "Update Lecture"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
