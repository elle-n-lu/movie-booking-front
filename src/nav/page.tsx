"use client";
import { api_url } from "@/api";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
interface pageProps {
  setItem: (item: number) => void;
  cinemaId: number;
  user: string | undefined;
  setCinemaId: (id: number) => void;
  setToken: (token: string | undefined) => void;
  setUserId: (userId: number | undefined) => void;
  setUser: (user: string | undefined) => void;
  setSchedule:(schedule:any)=>void
  
}
interface cinema {
  id: number;
  cinema_name: string;
}
const Nav: React.FC<pageProps> = ({
  setToken,
  setUserId,
  setUser,
  user,
  setItem,
  cinemaId,
  setCinemaId,
  setSchedule
}) => {
  // retrieve all cienams name and map in select options
  //make options a grid box
  const [cinemas, setCinemas] = useState([]);
  const getcinemas = async () => {
    await api_url
      .get("/cinemas")
      .then((res) => setCinemas(res.data))
      .catch((err) => console.log("errr", err));
  };
  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("user");
    setToken(undefined);
    setUserId(undefined);
    setUser(undefined);
  };
  useEffect(() => {
    getcinemas();
  }, []);
  return (
    <nav className="flex bg-black justify-between items-center">
      <div>
      <label className=" text-white font-bold text-lg text-center px-14 py-2 " ><Link href='/'>Movie tonight</Link></label>

        {/*  mapping cinemas */}
        <select
          name="cinemas"
          className="px-4 py-2 text-lg bg-black text-white border-0"
          value={cinemaId}
          onChange={(e) => {
            e.preventDefault();
            setCinemaId(e.target.value as any);
            setSchedule(null)
            setItem(0);
          }}
        >
          {cinemas &&
            cinemas.map((cinema: cinema, index) => {
              return (
                <option value={cinema.id} key={index} className="">
                  {cinema.cinema_name}
                </option>
              );
            })}
        </select>
      </div>

      <ul className="font-medium flex m-6">
        <li>
          <a
            href="#"
            className="block pb-2 hover:pb-0 pl-3 pr-4 text-gray-400 hover:text-white hover:border-b-2 "
          >
            About
          </a>
        </li>
        {user ? (
          <>
            <li className=" text-gray-400 px-4">
             hi,{" "} {user}{" "}
            </li>
            <li>
              <button
                className="pb-2  text-gray-400 hover:text-white hover:pb-0 hover:border-white hover:border-b-2 "
                onClick={() => logout()}
              >
                logout
              </button>{" "}
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href="/registe"
                className="block pb-2 px-3 text-gray-400 hover:pb-0 hover:text-white hover:border-white hover:border-b-2 "
              >
                Sign up
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="block pb-2 mr-14 text-gray-400 hover:pb-0 hover:text-white hover:border-white hover:border-b-2  "
              >
                Sign in
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default Nav;
