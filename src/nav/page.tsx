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
    <nav className="flex justify-between items-center mx-3">
      <div>
        <button className="p-4 mr-2 bg-blue-200 hover:bg-blue-500">Home</button>
        {/*  mapping cinemas */}
        <select
          name="cinemas"
          className="p-4 bg-blue-200 hover:bg-blue-500"
          value={cinemaId}
          onChange={(e) => {
            e.preventDefault();
            setCinemaId(e.target.value as any);
            setItem(0);
          }}
        >
          {cinemas &&
            cinemas.map((cinema: cinema, index) => {
              return (
                <option value={cinema.id} key={index}>
                  {cinema.cinema_name}
                </option>
              );
            })}
        </select>
      </div>

      <ul className="font-medium flex flex-col p-4 md:p-1 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a
            href="#"
            className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            About
          </a>
        </li>
        {user ? (
          <>
            <li className=" dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">
              {user}{" "}
            </li>
            <li>
              <button
                className="  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
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
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Sign up
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
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
