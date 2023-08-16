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
}
export interface seat_p {
  id: number;
  seat_number: string;
}
const Seat: React.FC<seatProps> = ({setSeats, seats, cinemaId, setSeatId , setItem}) => {
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

  useEffect(() => {
    getseats();
  }, [cinemaId]);
  return (
    <div>
      <div className="flex">
        <label>rooms</label>
        {seats &&
          seats.map((x: seat_p, index:number) => (
            <button
              onClick={(e: any) => {
                e.preventDefault();
                setSeatId(x.id);
                setActive((prevActive)=>!prevActive);
                setItem(0)
              }}
              key={index}
              className={`mx-2 ${active? 'bg-blue-400 text-white':''}  px-1 `}
            >
              {x.seat_number}
            </button>
          ))}
      </div>{" "}
    </div>
  );
};
export default Seat;
