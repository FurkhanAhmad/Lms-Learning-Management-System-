import { Menu, Moon, School, Sun } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "../components/ui/separator";
import { LogOut } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";

// const Navbar = () => {
//   const { user } = useSelector((store) => store.auth);
//   const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
//   const navigate = useNavigate();

//   const logoutHandler = async () => {
//     await logoutUser();
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success(data?.message || "User logged out.");
//       navigate("/login");
//     }
//   }, [isSuccess]);

//   return (
//     <div className="h-16 dark:bg-[#0A0A0A] border-b dark:border-b-gray-800 border-b-gray-200 left-0 right-0 duration-300 z-10">
//       {/* Desktop */}
//       <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
//         <div className="flex items-center gap-2">
//           <School size={30} />
//           <Link to="/">
//             <h1 className="hidden md:block font-extrabold text-2xl">
//               E-Learning
//             </h1>
//           </Link>
//         </div>

//         <div className="flex items-center gap-8">
//           {user ? (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Avatar className="h-9 w-9 cursor-pointer">
//                   <AvatarImage
//                     src={user?.photoUrl || "https://github.com/shadcn.png"}
//                     alt="@shadcn"
//                   />
//                   <AvatarFallback>CN</AvatarFallback>
//                 </Avatar>
//               </DropdownMenuTrigger>

//               <DropdownMenuContent className="w-56">
//                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuGroup>
//                   <DropdownMenuItem>
//                     <Link to="my-learning">My Learning</Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem>
//                     <Link to="profile">Edit Profile</Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={logoutHandler}>
//                     Log out
//                   </DropdownMenuItem>
//                 </DropdownMenuGroup>
             
// {user?.role === "instructor" && (
//   <DropdownMenuItem>
//     <Link to="/admin/dashboard">Dashboard</Link>
//   </DropdownMenuItem>
// )}

// {!user?.role && (
//   <div className="flex items-center gap-2">
//     <Button className="mr-4" onClick={() => navigate("/login")}>
//       Login
//     </Button>
//     <Button onClick={() => navigate("/login")}>Signup</Button>
//   </div>
// )}

//           <DarkMode />
//         </div>
//       </div>

//       {/* Mobile */}
//       <div className="flex md:hidden items-center justify-between px-4 h-full">
//         <h1 className="font-extrabold text-2xl">E-Learning</h1>
//         <MobileNavbar />
//       </div>
//     </div>
//   );
// };

// export default Navbar;



const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="h-16 dark:bg-[#0A0A0A] border-b dark:border-b-gray-800 border-b-gray-200 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2">
          <School size={30} />
          <Link to="/">
            <h1 className="hidden md:block font-extrabold text-2xl">
              E-Learning
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar >
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="my-learning">My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="profile">Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Link to="/admin/dashboard">Ddashboard</Link></DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button className="mr-4" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/login")}>Signup</Button>
            </div>
          )}

          <DarkMode />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">E-Learning</h1>
        <MobileNavbar user={user}/>
      </div>
    </div>
  );
};

export default Navbar;


// ✅ Fixed: Mobile Navbar (renamed + improved)
const MobileNavbar = ({ user }) => {
   // Replace with dynamic role if needed

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gray-200 hover:bg-gray-200"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-col items-start mt-2 gap-1">
          <SheetTitle> <Link to="/"></Link>E-Learning</SheetTitle>
          <SheetDescription>Mobile navigation menu</SheetDescription>
        </SheetHeader>

        <Separator className="my-4" />

        <nav className="flex flex-col space-y-4 ml-4 font-semibold">
          <Link to="/my-learning">My Learning</Link>
          <Link to="/profile">Edit Profile</Link>
          <button onClick={() => console.log("Logout")}>Log out</button>
        </nav>

        {user?.role !== "instructor" && (
          <SheetFooter className="mt-auto">
            <SheetClose asChild>
              <Button asChild>
                <Link to="admin/dashboard">Dashboard</Link>
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};



