"use client";
import { api_url } from "@/api";
import { user } from "@/components/body";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
interface pageProps {
  setItem: (item: number) => void;
  cinemaId: number;
  user?: user;
  setCinemaId: (id: number) => void;
  setToken: (token: string | undefined) => void;
  setUser: (user?: user) => void;
  setSchedule: (schedule: any) => void

}
interface cinema {
  id: number;
  cinema_name: string;
}
const Nav: React.FC<pageProps> = ({
  setToken,
  setUser,
  user,
  setItem,
  cinemaId,
  setCinemaId,
  setSchedule
}) => {
  // retrieve all cienams name and map in select options

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
    setUser(undefined);
    window.location.reload()
  };
  useEffect(() => {
    getcinemas();
  }, []);

  return (
    <nav className="flex bg-black justify-between items-center py-6">
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
      <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div id="navbar-default" className="hidden w-full md:block md:w-auto">

        <ul className="font-medium flex pr-6 ">

          {user ? (
            <>
              <li>
                <Link
                  href={{ pathname: "/orders", query: { id: user.id } }}
                  className="block pb-2 hover:pb-0 pl-3 pr-4 text-gray-400 hover:text-white hover:border-b-2 "
                >
                  My Orders
                </Link>
              </li>
              <li className=" text-gray-400 px-4">
                hi,{" "} {user.name}{" "}
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
      </div>
    </nav>
  );
};
export default Nav;
