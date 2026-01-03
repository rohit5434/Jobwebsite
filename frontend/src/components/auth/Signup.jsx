import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../../utils/constant";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const [msg, setMsg] = useState(""); // ✅ Message State
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);

    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        withCredentials: true,
      });

      setMsg("✅ Signup Successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500); // ✅ redirect to login
    } catch (error) {
      setMsg(error.response?.data?.message || "❌ Signup Failed");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto mt-12">
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-5 p-10 shadow-xl rounded-2xl border w-[550px] bg-white"
        >
          <h1 className="font-bold text-3xl mb-2 text-center text-gray-800">
            Sign Up
          </h1>

          {msg && (
            <p className="text-center text-sm font-semibold text-purple-600">
              {msg}
            </p>
          )}

          <div>
            <Label className="text-gray-700">Full Name</Label>
            <Input
              type="text"
              name="fullName"
              value={input.fullName}
              onChange={changeEventHandler}
              placeholder="Rohit Mishra"
            />
          </div>

          <div>
            <Label className="text-gray-700">Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="example@gmail.com"
            />
          </div>

          <div>
            <Label className="text-gray-700">Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="9999999999"
            />
          </div>

          <div>
            <Label className="text-gray-700">Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter password"
            />
          </div>

          <RadioGroup
            onValueChange={(value) => setInput({ ...input, role: value })}
            value={input.role}
            className="flex items-center gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="student" id="student" />
              <Label htmlFor="student" className="text-gray-700">
                Student
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="recruiter" id="recruiter" />
              <Label htmlFor="recruiter" className="text-gray-700">
                Recruiter
              </Label>
            </div>
          </RadioGroup>

          <div className="flex items-center gap-2 w-[270px]">
            <Label htmlFor="profile" className="text-gray-700 whitespace-nowrap">
              Profile
            </Label>
            <input
              type="file"
              id="profile"
              onChange={changeFileHandler}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md 
                         file:border-0 file:text-sm file:font-medium 
                         file:bg-purple-600 file:text-white hover:file:bg-purple-700 
                         cursor-pointer border rounded-md w-full"
            />
          </div>

          <Button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg py-2.5 mt-4 text-lg transition"
          >
            Signup
          </Button>

          <p className="text-sm text-center mt-2 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
