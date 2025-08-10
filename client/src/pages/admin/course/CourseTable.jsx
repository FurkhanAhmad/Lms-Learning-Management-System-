import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const { data, isLoading, error } = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  if (isLoading) return <h1 className="ml-3 mt-3">Loading...</h1>;
  if (error) return <h1 className="ml-3 mt-3 text-red-500">Failed to fetch courses</h1>;
  if (!data?.courses?.length) return <h1 className="ml-3 mt-3">No courses found</h1>;

  return (
    <div className="ml-3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Courses</h2>
        <Button onClick={() => navigate(`create`)}>Create New Course</Button>
      </div>

      <Table>
        <TableCaption>A list of your recent courses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price (INR)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.courses.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">{course?.price ?? "NA"}</TableCell>

              <TableCell>
                <Badge variant={course.isPublished ? "default" : "secondary"}>
                  {course.isPublished ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell>{course.courseTitle || "Untitled"}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate(`${course._id}`)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
