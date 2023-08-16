"use client";
import { api_url } from "@/api";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface registeProps {}
const Registe: React.FC<registeProps> = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
    const [message,setMessage] = useState('')
  const submitForm = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    await api_url
      .post("/registe", formData, { withCredentials: true })
      .then((res) => router.push("/login"))
      .catch((error) => {console.log("error.response.data[0]",JSON.stringify(error.response.data.error));setMessage(JSON.stringify(error.response.data.error))});
  };
  return (
    <div className="flex flex-col w-1/2 items-center justify-center  px-6 py-8 mx-auto md:h-screen lg:py-0">
      <form className="space-y-4 md:space-y-6" onSubmit={submitForm}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Your username
          </label>
          <input
            value={username}
            onChange={(e) => {setUsername(e.target.value)}}
            type="username"
            name="username"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            placeholder="username"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Your email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            required
          />
        </div>
        {message && <label className="text-red-500">{message}</label>}
        <button
          type="submit"
          className="w-full text-white bg-blue-300 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Sign Up
        </button>
        <p className="text-sm font-light text-gray-500 ">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:underline "
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Registe;