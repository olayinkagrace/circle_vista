"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../redux/slices/postSlice";
import axios from "axios";
import { selectUsername } from "../redux/slices/userSlice";
import { FaCamera, FaCheck } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);
  const [base64str, setBase64str] = useState("");
  const [post, setPost] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      let response;

      if (base64str) {
        response = await axios.post(
          "https://assignment-api-spxd.onrender.com/api/createpost",
          {
            username,
            post,
            base64str,
          }
        );
      } else {
        // without an image
        response = await axios.post(
          "https://assignment-api-spxd.onrender.com/api/posts",
          {
            username,
            post,
          }
        );
      }

      if (response.status === 200) {
        dispatch(addPost(response.data));
        setMessage("Post Created Successfully");
        router.push("/posts");
      }
    } catch (error) {
      setError("Post creation failed");
    }
  };

  return (
    <main className="bg-purple-500 h-screen flex items-center justify-center">
      <form className="bg-white p-8 rounded-lg shadow-md w-[90%]">
        <h1 className="text-2xl text-zinc-500 font-extrabold mb-4">
          What's on your mind?
        </h1>
        <div className="mb-4 flex items-center">
          <label htmlFor="base64" className="cursor-pointer">
            <FaCamera className="text-purple-700 text-2xl" />
            <span className="ml-2 text-sm">
              {base64str ? (
                <FaCheck className="text-green-500" />
              ) : (
                "Base64 String"
              )}
            </span>
          </label>
          <input
            id="base64"
            type="text"
            name="base64"
            autoComplete="base64"
            placeholder="Base64 String"
            onChange={(e) => setBase64str(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <textarea
          id="post"
          name="post"
          placeholder="Write your post..."
          onChange={(e) => setPost(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleCreatePost}
          className="w-full p-2 bg-purple-700 text-white rounded-md hover:bg-purple-800"
        >
          Create Post
        </button>
        {message && <p className="text-green-500 text-sm">{message}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="mt-4 text-center">
          <Link href="/" className="text-purple-700 hover:underline text-sm">
            Go back to Home
          </Link>
        </div>
      </form>
    </main>
  );
}
