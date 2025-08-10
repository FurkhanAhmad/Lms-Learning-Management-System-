



import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
  useLogoutUserMutation,
} from "@/features/api/authApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [updateUser, { data: updateUserData, isLoading: updateUserIsLoading, isError, error, isSuccess }] = useUpdateUserMutation();
  const [logoutUser] = useLogoutUserMutation();

  const user = data?.user;

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(updateUserData?.message || "Profile Updated");
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to update Profile");
    }
  }, [isSuccess, isError, updateUserData, error]);

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      localStorage.removeItem("token");
      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    }
  };

  if (isLoading) return <h1 className="text-center mt-10">Profile Loading...</h1>;

  return (
    <div className="max-w-5xl mx-auto px-4 my-10">
      <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-6 flex-wrap">
        {/* Avatar with dropdown */}
        <div className="flex flex-col items-center">
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4 cursor-pointer">
                  <AvatarImage
                    src={user.photoUrl || "https://github.com/shadcn.png"}
                    alt="Profile"
                  />
                  <AvatarFallback>{user.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-48">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Profile Info and Edit Dialog */}
        <div className="w-full md:flex-1">
          <div className="space-y-2 mb-4">
            <p><span className="font-semibold">Name:</span> {user?.name}</p>
            <p><span className="font-semibold">Email:</span> {user?.email}</p>
            <p><span className="font-semibold">Role:</span> {user?.role?.toUpperCase()}</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>Make changes to your profile here.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input
                    onChange={onChangeHandler}
                    type="file"
                    accept="image/*"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={updateUserIsLoading}
                  onClick={updateUserHandler}
                  aria-busy={updateUserIsLoading}
                >
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please Wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Enrolled Courses</h2>
        {user?.enrolledCourses?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {user.enrolledCourses.map((course) => (
              <Course course={course} key={course._id} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
