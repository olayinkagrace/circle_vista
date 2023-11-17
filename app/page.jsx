"use client";

import Link from "next/link";
import Navbar from "./components/Navbar";
import illustration from "../public/illustration.png";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-purple-500 min-h-screen flex  items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-[90%] my-10">
        <Navbar />
        <div className="grid sm:grid-cols-2">
          <div className="mt-12">
            <h2 className="font font-bold sm:text-4xl text-3xl text-center text-violet-500">
              Welcome to CircleVista
            </h2>
            <p className="text-center text-zinc-500 mt-5 p-5">
              Welcome to CircleVista, your hub for genuine connections. Join
              circles, engage authentically, and empower communities on our
              platform. Experience a space where real connections thrive
              effortlessly.
            </p>
            <Link href="/register">
              <button className="bg-purple-500 rounded-lg p-2 text-white mt-10">
                Get Started
              </button>
            </Link>
          </div>
          <Image src={illustration} alt="illustration" className="w-[100%] min-h-[70%]" />
        </div>
      </div>
    </main>
  );
}
