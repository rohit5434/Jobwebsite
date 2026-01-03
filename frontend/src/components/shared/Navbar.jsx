import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(false);

  return (
    <div className="bg-white shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-6xl h-16 px-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold select-none">
          Job<span className="text-red-600">Portal</span>
        </h1>

        {/* Right Section */}
        <div className="flex items-center gap-6 font-medium">
          {/* Navigation Links */}
          <ul className="flex items-center gap-5 text-gray-700">
            <li className="hover:text-purple-600 cursor-pointer">Home</li>
            <li className="hover:text-purple-600 cursor-pointer">Jobs</li>
            <li className="hover:text-purple-600 cursor-pointer">Browse</li>
          </ul>

          {/* Conditional Rendering */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setUser(true)}
                className="border-gray-300"
              >
                Login
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white transition">
                Sign Up
              </Button>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer hover:opacity-80 transition border border-gray-200">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="User avatar"
                  />
                  <AvatarFallback>RM</AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-56 bg-white border rounded-xl shadow-lg p-4">
                {/* User Info */}
                <div className="flex items-center gap-3 mb-3 border-b pb-3">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="User"
                    />
                    <AvatarFallback>RM</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold text-gray-800">Rohit Mishra</h2>
                    <p className="text-sm text-gray-500">View Profile</p>
                  </div>
                </div>

                {/* Options */}
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="link"
                    className="justify-start text-gray-700 hover:text-blue-600"
                  >
                    <User className="mr-2 h-4 w-4" /> View Profile
                  </Button>

                  <Button
                    variant="link"
                    className="justify-start text-gray-700 hover:text-red-600"
                    onClick={() => setUser(false)}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
