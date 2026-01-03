import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!input.email || !input.password || !input.role) {
        return alert("Please fill all fields");
      }

      const res = await axios.post("/api/v1/user/login", input);

      if (res.data.success) {
        alert("Login Successful ✅");
        navigate("/"); // ✅ HOME PAGE
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed ❌");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto mt-16 px-4">
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-5 p-10 shadow-xl rounded-2xl border w-[500px] bg-white"
        >
          <h1 className="font-bold text-3xl mb-2 text-center text-gray-800">Log in</h1>

          <div>
            <Label className="text-gray-700">Email</Label>
            <Input
              type="email"
              placeholder="rohitmishra123@gmail.com"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label className="text-gray-700">Password</Label>
            <Input
              type="password"
              placeholder="Enter password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
            />
          </div>

          <div className="flex flex-col mt-2">
            <Label className="text-gray-700 mb-2">Role</Label>
            <RadioGroup
              onValueChange={(value) => setInput({ ...input, role: value })}
              value={input.role}
              className="flex items-center gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="recruiter" id="recruiter" />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
            Login
          </Button>

          <p className="text-center text-sm mt-2">
            Don’t have an account?{" "}
            <a href="/signup" className="text-purple-600 font-semibold hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
