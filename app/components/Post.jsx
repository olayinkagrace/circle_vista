import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function Post({ base64str, username, post, created_at }) {
  return (
    <div className="border p-4 mb-4 rounded-lg shadow-md bg-white">
      <div className="flex flex-wrap justify-between">
        <div className="mb-4 flex items-center flex-wrap">
          <div className="rounded-full border w-10 h-10 mr-4 flex  items-center justify-center border-gray-400">
            <p className="text-gray-700">{base64str}</p>
          </div>

          <p className="text-zinc-400 font-bold text-sm">{username}</p>
        </div>

        <p className="text-gray-400 text-sm">
          {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
        </p>
      </div>
      <p className="text-gray-800">{post}</p>
    </div>
  );
}
