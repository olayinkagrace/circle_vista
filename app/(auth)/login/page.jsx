

/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUsername } from "../../redux/slices/userSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [username, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://assignment-api-spxd.onrender.com/api/login",
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        dispatch(setUsername(username));
        router.push("/");
      } else {
        setError("Login failed. Please check your username and password.");
      }
    } catch (error) {
      setError("Login failed. Please check your username and password.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="bg-purple-500 h-screen flex items-center justify-center">
      <form className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-extrabold mb-4 text-zinc-500">
          Welcome Back
        </h1>
        <div className="flex items-center mb-4">
          <FaUser className="mr-2" />
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            autoComplete="username"
            className="w-full p-2 outline-0 border border-gray-300 rounded-md"
            onChange={(e) => setUsernameInput(e.target.value)}
          />
        </div>
        <div className="flex items-center mb-4">
          <FaLock className="mr-2" />
          <div className="flex w-full p-2 border border-gray-300 rounded-md">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              name="password"
              className="border-0 outline-none border-transparent w-full"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={togglePasswordVisibility}
              className="cursor-pointer text-zinc-500  float-right"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <button
          className="w-full p-2 bg-purple-700 text-white rounded-md hover:bg-purple-800"
          onClick={handleLogin}
        >
          Login
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="mt-4 text-center text-sm">
          Don't have an account?
          <Link href="/register" className="text-purple-700 hover:underline">
            Register
          </Link>
        </div>
      </form>
    </main>
  );
}
