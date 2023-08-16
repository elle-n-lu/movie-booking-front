import { schedule, session } from "@/movies/page";
import React, { useEffect, useState } from "react";
import "./ses.css";
import { seat_p } from "@/seats/seat";
import { api_url } from "@/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface pageProps {
  token: string | undefined;
  schedules: schedule[];
  sessions: session[];
  setSessions: (session: session[]) => void;
  totalseats: seat_p[];
  cinemeId: number;
  userId: number | undefined | null;
}
interface seatS {
  seatNo: string;
  sold: boolean;
}
const seatlayouts = (solds: any, totalseats: number) => {
  const rows = ["A", "B", "C", "D", "E", "F"];
  const all = [];
  for (let rol of rows) {
    const col_s = [];
    for (let i = 1; i < totalseats / rol.length + 2; i++) {
      // totalseats:20 ,col: (1,5), 5 row 4 column
      const seatNo = i + rol;
      const isSold = solds.includes(seatNo);
      const cols = { seatNo: seatNo, sold: isSold };
      col_s.push(cols);
    }
    all.push(col_s);
  }
  return all;
};

const Session: React.FC<pageProps> = ({
  token,
  userId,
  cinemeId,
  schedules,
  totalseats,
  sessions,
  setSessions,
}) => {
  const totalseat_len = totalseats.length;
  const [sessionId, setSessionId] = useState<number>();

  // fake sold seat, later replaced
  // const seatSold = ["2A", "3B", "3C", "2D", "10B", "8C"];
  const [seatSold, setSeatSold] = useState<any[]>([]);
  // fetch sold seats by sessionId
  const fetchsolds = async () => {
    await api_url
      .get("/orders/" + sessionId)
      .then((res) => {
        // add seats var later
        console.log("seatssolds", res.data);
        setSeatSold(res.data);
      })
      .catch((err) => console.log("errr", err));
  };

  // open modal to select seat
  const [open, setOpen] = useState(false);
  // according to seats total number, set up the seats layout.
  const seatsLayout = seatSold ? seatlayouts(seatSold, totalseat_len) : [];
  const [checkedSeats, setCheckedSeats] = useState<any[]>([]);

  console.log("sessoinid", sessionId);
  console.log("checkedseat", checkedSeats);
  console.log("seatsLayout", seatsLayout);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const toggleSeat = (seatNo: string) => {
    if (checkedSeats.includes(seatNo)) {
      setCheckedSeats(checkedSeats.filter((seat) => seat !== seatNo));
    } else {
      setCheckedSeats([...checkedSeats, seatNo]);
    }
  };

  const isSeatChecked = (seatNo: any) => checkedSeats.includes(seatNo);

  const isSeatSold = (seatNo: any) => seatSold.includes(seatNo);

  const createOrder = async (checkedSeats:any, cinemeId:any, sessionId:any) => {
    const formData = new FormData();
    formData.append("seat", checkedSeats);
    await api_url
      .post(
        `/orders/create_new/${cinemeId}/${sessionId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log("seatssolds", res.data);
        window.location.reload()
      })
      .catch((err) => console.log("errr", err));
  };
  useEffect(() => {
    if (sessionId) {
      fetchsolds();
    }
  }, [sessionId]);
  const router = useRouter()
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
                          <label className="block relative w-6 h-6 cursor-pointer">
                            <input
                              type="checkbox"
                              className={`absolute ${
                                rol?.sold ? "bg-slate-400" : "bg-slate-600"
                              } `}
                              name={rol?.seatNo}
                              style={{ appearance: "none" }}
                              checked={isSeatChecked(rol?.seatNo)}
                              onChange={(e) =>
                                isSeatSold(e.target.name)
                                  ? ""
                                  : toggleSeat(e.target.name)
                              }
                            />
                            <span
                              className={`relative ${
                                rol?.sold ? "bg-slate-400" : "bg-slate-600"
                              } ${isSeatChecked(rol?.seatNo) ? "active" : ""}`}
                              style={{
                                display: "block",
                                width: "24px",
                                height: "20px",
                              }}
                            ></span>
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
            {userId ? (
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                onClick={(e) => {
                  e.preventDefault();
                  createOrder(checkedSeats, cinemeId, sessionId);
                  setOpen(false);
                  setCheckedSeats([]);
                }}
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                <Link href="/login">Login to Proceed</Link>
              </button>
            )}

            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={() => {
                setOpen(false);
                setCheckedSeats([]);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      {open && modal}
      {schedules.map((schedule, index) => {
        const date = schedule.schedule_date.split(" ")[0];
        const d = new Date(date);
        const day = d.getDay();
        return (
          <div key={index} className="flex mt-2">
            <div className="mr-4">
              {date.split("-")[1] + "-" + date.split("-")[2] + " " + days[day]}
            </div>
            <div className="flex flex-col">
              {schedule.sessions.map((session, index1) => (
                <div key={index1} className="flex mb-4 ">
                  {session.session_time}
                  <button
                    className="p-2 text-xs ml-2 bg-orange-400"
                    onClick={() => {
                      setOpen(true);
                      setSessionId(session.id);
                    }}
                  >
                    Ticket
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Session;
