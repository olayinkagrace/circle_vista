"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUsername } from "../../redux/slices/userSlice";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [username, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://assignment-api-spxd.onrender.com/api/register",
        {
          username,
          password,
        }
      );
      dispatch(setUsername(username));

      router.push("/");
    } catch (error) {
      console.error("Registration failed", error);

      setError("Registration failed. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="bg-purple-500 h-screen flex items-center justify-center">
      <form className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl text-zinc-500 font-extrabold mb-4">Create an account</h1>
        <div className="flex items-center mb-4">
          <FaUser className="mr-2" />
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            autoComplete="username"
            className="w-full p-2 border outline-none border-gray-300 rounded-md"
            onChange={(e) => setUsernameInput(e.target.value)}
          />
        </div>
        <div className="flex items-center mb-4">
          <FaLock className="mr-2" />
          <div className="flex w-full p-2 border border-gray-300 rounded-md">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="border-0 outline-none border-transparent"
              placeholder="Password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={togglePasswordVisibility}
              className="cursor-pointer text-zinc-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <button
          className="w-full p-2 bg-purple-700 text-white rounded-md hover:bg-purple-800"
          onClick={handleRegister}
        >
          Register
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-700 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </main>
  );
}
