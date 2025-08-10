// import React from "react";
// import { Link } from "react-router-dom";
// import { Card, CardContent } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";

// const Course = ({ course }) => {
//   return (
//     <Card  
//       key={course._id}
//       className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
//     >
//       <div className="relative">
//         <img
//           src={course.courseThumbnail}
//           alt={course.courseTitle}
//           className="w-full h-36 object-cover rounded-t-lg"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-lg"></div>
//       </div>
//       <CardContent className="px-5 py-4 space-y-3">
//         <Link to={`/course-details/${course._id}`}>
//           <h1 className="hover:underline font-bold text-lg truncate">
//             {course.courseTitle}
//           </h1>
//         </Link>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Avatar className="h-8 w-8">
//               <AvatarImage src={course.creator?.photoUrl} />
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//             <h1 className="font-medium text-sm">
//               {course.creator?.name}
//             </h1>
//           </div>
//           <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
//             {course.courseLevel}
//           </Badge>
//         </div>
//         <div className="text-lg font-bold ">
//         <span>₹{course.price}</span>

//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default Course;






// components/Course.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Course = ({ course }) => {
  if (!course) return null;

  const {
    _id,
    courseTitle = "Untitled Course",
    courseThumbnail = "https://via.placeholder.com/300x200?text=No+Image",
    price = 0,
    courseLevel = "Beginner",
    creator = {},
  } = course;

  const { name = "Unknown", photoUrl = "https://github.com/shadcn.png" } = creator;

  return (
    <Card
      key={_id}
      className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
    >
      <div className="relative">
        <img
          src={courseThumbnail}
          alt={courseTitle}
          className="w-full h-36 object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-lg"></div>
      </div>

      <CardContent className="px-5 py-4 space-y-3">
        <Link to={`/course-details/${_id}`}>
          <h1 className="hover:underline font-bold text-lg truncate">{courseTitle}</h1>
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={photoUrl} />
              <AvatarFallback>{name[0] || "?"}</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">{name}</h1>
          </div>
          <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
            {courseLevel}
          </Badge>
        </div>

        <div className="text-lg font-bold">
          <span>₹{price}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;





// import React from "react";
// import { Link } from "react-router-dom";
// import { Card, CardContent } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";

// const Course = ({ course }) => {
//   if (!course) return null;

//   const {
//     _id,
//     courseTitle = "Untitled Course",
//     courseThumbnail = "https://via.placeholder.com/300x200?text=No+Image",
//     price = 0,
//     courseLevel = "Beginner",
//     creator = {},
//   } = course;

//   const { name = "Unknown", photoUrl = "https://github.com/shadcn.png" } = creator;

//   return (
//     <Card
//       key={_id}
//       className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
//     >
//       <div className="relative">
//         <img
//           src={courseThumbnail}
//           alt={courseTitle}
//           className="w-full h-36 object-cover rounded-t-lg"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-lg"></div>
//       </div>

//       <CardContent className="px-5 py-4 space-y-3">
//         <Link to={`/course-details/${_id}`}>
//           <h1 className="hover:underline font-bold text-lg truncate">
//             {courseTitle}
//           </h1>
//         </Link>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Avatar className="h-8 w-8">
//               <AvatarImage src={photoUrl} />
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//             <h1 className="font-medium text-sm">{name}</h1>
//           </div>
//           <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
//             {courseLevel}
//           </Badge>
//         </div>

//         <div className="text-lg font-bold">
//           <span>₹{price}</span>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default Course;
