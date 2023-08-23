"use client";
import { api_url } from "@/api";
import SlideBbuttons from "@/components/slide_buttons";
import React, { useEffect, useState } from "react";
interface seatProps {
  cinemaId: number;
  setSeatId: (seatId: number) => void;
  setItem:(item:number)=>void,
  seats:seat_p[],
   setSeats: (seat:seat_p[])=>void
  setSchedule:(schedule:any)=>void

}
export interface seat_p {
  id: number;
  seat_number: string;
}
const Seat: React.FC<seatProps> = ({setSchedule,setSeats, seats, cinemaId, setSeatId , setItem}) => {
  const [active, setActive] = useState(false)

  
  const getseats = async () => {
    await api_url
      .get("/ajax_seats/" + cinemaId)
      .then((res) => {
        setSeats(res.data);
        setSeatId(res.data[0].id)
        
      })
      .catch((err) => console.log("errr", err));
  };
  const [calue, setCalue] = useState(-1)

  useEffect(() => {
    getseats();
  }, [cinemaId]);
  return (
      <div className=" bg-gray-500 w-full flex justify-center pl-24 py-2 text-lg text-gray-300 font-bold">
        <label>Select room size</label>
        {seats &&
          seats.map((x: seat_p, index:number) => (
            <button
              onClick={(e: any) => {
                e.preventDefault();
                setSeatId(x.id);
                setSchedule(null)
                setItem(0)
                setCalue(index)
              }}
              style={{
                color: calue === index ? 'white' : 'lightgray'
              }}
              key={index}
              className={`mx-2  hover:text-white  px-1 `}
            >
              {x.seat_number}
            </button>
          ))}
      </div>
  );
};
export default Seat;
