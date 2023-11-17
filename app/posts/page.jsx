"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectUsername } from "../redux/slices/userSlice";
import Post from "../components/Post";
import { FaHome } from "react-icons/fa";
import Link from "next/link";

export default function Posts() {
  const [userPosts, setUserPosts] = useState([]);
  const username = useSelector(selectUsername);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        if (username) {
          const response = await axios.get(
            `https://assignment-api-spxd.onrender.com/api/posts/${username}`
          );
          setUserPosts(response.data);
        }
      } catch (error) {
        console.error("Error fetching user posts", error.response || error);
        setError("Error fetching user posts");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [username]);

  return (
    <main className="bg-purple-500 min-h-screen flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-[80%] my-10">
        <div className="flex flex-wrap justify-between">
          <h1 className="text-3xl font-bold mb-4 text-purple-800">
            Your Posts
          </h1>
          <Link href="/">
            {" "}
            <FaHome className="text-violet-400" />
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-800">Loading...</p>
        ) : error ? (
          <div className="flex justify-center items-center ">
            <p className="text-red-500 text-center">{error}</p>
          </div>
        ) : userPosts.data && userPosts.data.length > 0 ? (
          <ul className="list-disc pl-4">
            {userPosts.data.map((post, index) => (
              <li key={index} className="mb-4">
                <Post
                  key={index}
                  post={post.post}
                  username={post.username}
                  base64str={post.base64str}
                  created_at={post.created_at}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex justify-center items-center ">
            <p className="text-gray-700 text-center self-center">
              No posts created by {username ? username : "you"}
            </p>
          </div>
        )}
      </div>
    </main>
  );
                  }
