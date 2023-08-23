"use client";
import { api_url } from '@/api';
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import Body from '@/components/body';

interface loginProps {

}
const Login: React.FC<loginProps> = ()=>{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message,setMessage] = useState('')

  const router=useRouter()
  const submitForm=async(e:any)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", username);
    formData.append("password", password);

    const res = await api_url
      .post("/login", formData, { withCredentials: true })
      .then( (res) => {
        window.localStorage.setItem("access", res.data.token);
        window.localStorage.setItem("user", JSON.stringify({'id':res.data.id,'name':res.data.user}));
        // console.log('res',res.data)
        router.push("/");
      })
      .catch((error) => {console.log(error.response.data.error); setMessage(JSON.stringify(error.response.data.error)) });
  };

  const body=(item:any, setItem:any,userId:any, setUserId:any,user:any, setUser:any,token:any, setToken:any,schedule:any, setSchedule:any)=>(
    <>
    <div className="flex flex-col border-2 w-1/2 items-center justify-center px-6 py-8 mx-auto md:h-1/2 lg:py-0">

       <form className="space-y-4 md:space-y-6" onSubmit={submitForm}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Your email
                </label>
                <input
                  value={username}
                  onChange={(e) => {setUsername(e.target.value);setMessage('')}}
                  type="email"
                  name="email"
                  id="email"
                  className=" bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  // style={{borderColor: message? "red":" gray "}}
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
                  onChange={(e) => {setPassword(e.target.value);setMessage('')}}
                  type="password"
                  name="password"
                  id="password"
                  // style={{borderColor: message? "red":" gray "}}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                />
              </div>
        {message && <label className="text-red-500">{message}</label>}

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Don&rsquo;t have an account yet?
                <Link
                  href="/registe"
                  className="font-medium text-blue-600 hover:underline "
                >
                  Sign up
                </Link>
              </p>
            </form>
    </div>
    </>)
    return (
      <Body body={(item:any, setItem:any,userId:any, setUserId:any,user:any, setUser:any,token:any, setToken:any,schedule:any, setSchedule:any)=>body(item, setItem,userId, setUserId,user, setUser,token, setToken,schedule, setSchedule)} />

    )
}
export default Login