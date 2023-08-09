import { schedule, session } from "@/movies/page";
import React, { useState } from "react";
import "./ses.css";

interface pageProps {
  schedules: schedule[];
  sessions: session[];
  setSessions: (session: session[]) => void;
}
interface seatS {
  seatNo: string;
  sold: boolean;
}
const seatlayouts = (solds: any) => {
  const rols = ["A", "B", "C", "D", "E", "F"];
  const all = [];
  for (let rol of rols) {
    const col_s = [];
    for (let i = 1; i < 13; i++) {
      const seatNo = i + rol;
      const isSold = solds.includes(seatNo);
      const cols = { seatNo: seatNo, sold: isSold };
      col_s.push(cols);
    }
    all.push(col_s);
  }
  return all;
};

const Session: React.FC<pageProps> = ({ schedules, sessions, setSessions }) => {
  const seatSold = ["2A", "3B", "3C", "2D", "10B", "8C"];
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const seatsLayout = seatlayouts(seatSold);
  const [checkedSeats, setCheckedSeats] = useState<any[]>([]);

  const toggleSeat = (seatNo: string) => {
    if (checkedSeats.includes(seatNo)) {
      setCheckedSeats(checkedSeats.filter((seat) => seat !== seatNo));
    } else {
      setCheckedSeats([...checkedSeats, seatNo]);
    }
  };

  const isSeatChecked = (seatNo: any) => checkedSeats.includes(seatNo);

  const isSeatSold = (seatNo: any) => seatSold.includes(seatNo);

  const modal = (
    <div className="fixed inset-0 z-10 overflow-y-auto p-4 bg-gray-500 bg-opacity-75">
      <div className="flex min-h-full items-center justify-center  ">
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <h1>select your seats</h1>
          <div className="relative mt-8">
            <table className="text-sm text-left text-gray-500">
              <tbody>
                {seatsLayout.map((rols, index) => {
                  return (
                    <tr key={index} className="bg-white">
                      {rols.map((rol, index1) => (
                        <td key={index1} className="p-2 relative">
                          <label className="block relative w-6 h-6 cursor-pointer" >
                            <input
                              type="checkbox"
                              className={`absolute ${
                                rol?.sold ? "bg-slate-400" : "bg-slate-600"
                              } `}
                              name={rol?.seatNo}
                              style={{appearance:'none'}}
                              checked={isSeatChecked(rol?.seatNo)}
                              onChange={(e) => isSeatSold(e.target.name)?"":toggleSeat(e.target.name)}
                            />
                            <span
                              className={`relative ${
                                rol?.sold? "bg-slate-400" : "bg-slate-600"
                              } ${
                                isSeatChecked(rol?.seatNo)? "active":""
                              }`}
                              style={{
                                display:"block",
                                width: "24px",
                              height: "20px",
                              }}
                            >
                            </span>
                          </label>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              onClick={() => setOpen(false)}
            >
              Deactivate
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  console.log("seat", checkedSeats);
  return (
    <div>
      {open && modal}
      {schedules.map((schedule, index) => {
        return (
          <div key={index}>
            {schedule.sessions.map((session, index1) => (
              <div key={index1} className="flex items-center mt-2">
                {session.session_time}
                <button
                  className="p-2 text-xs ml-2 bg-orange-400"
                  onClick={() => setOpen(true)}
                >
                  Ticket
                </button>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
export default Session;
