import { schedule, session } from "@/movies/page";
import React, { useEffect, useState } from "react";
import "./ses.css";
import { seat_p } from "@/seats/seat";
import { api_url } from "@/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Ticket from "@/components/ticket";
import { user } from "@/components/body";

interface pageProps {
  token: string | undefined;
  schedules: schedule[];
  totalseats: seat_p[];
  cinemeId: number;
  user?: user;
  schedule:schedule 
  setSchedule:(schedule:schedule)=>void
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
  user,
  cinemeId,
  schedules,
  totalseats,
  schedule, setSchedule
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
        setSeatSold(res.data);
      })
      .catch((err) => console.log("errr", err));
  };
  // open modal to select seat
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState(0)
  // according to seats total number, set up the seats layout.
  const seatsLayout = seatSold ? seatlayouts(seatSold, totalseat_len) : [];
  const [checkedSeats, setCheckedSeats] = useState<any[]>([]);
  const [totalprice, setTotalPrice]=useState(0)

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const toggleSeat = (seatNo: string) => {
    if (checkedSeats.includes(seatNo)) {
      setCheckedSeats(checkedSeats.filter((seat) => seat !== seatNo));
    } else {
      setCheckedSeats([...checkedSeats, seatNo]);
      setTotalPrice([...checkedSeats, seatNo].length*price)
    }
  };

  const isSeatChecked = (seatNo: any) => checkedSeats.includes(seatNo);

  const isSeatSold = (seatNo: any) => seatSold.includes(seatNo);

  const createOrder = async (totalprice:any,checkedSeats: any, cinemeId: any, sessionId: any) => {
    const formData = new FormData();
    formData.append("seat", checkedSeats);
    formData.append("total_price", totalprice);
    await api_url
      .post(
        `/orders/create_new/${cinemeId}/${sessionId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
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
                              className={`absolute ${rol?.sold ? "bg-slate-400" : "bg-slate-600"
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
                              className={`relative ${rol?.sold ? "bg-slate-400" : "bg-slate-600"
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
            Total Price: {checkedSeats.length*price}
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            {user ? (
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                onClick={(e) => {
                  e.preventDefault();
                  createOrder(totalprice,checkedSeats, cinemeId, sessionId);
                  setOpen(false);
                  setCheckedSeats([]);
                  setTotalPrice(0);
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
                setTotalPrice(0)
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  const [calue, setCalue] = useState(-1)
  // {/* {`#${schedule.schedule_date}`} */}
  return (
    <div className="flex flex-col mt-2">

      {open && modal}
      <div className="flex justify-center">

        {schedules.map((schedule, index) => {
          const date = schedule.schedule_date.split(" ")[0];
          const d = new Date(date);
          const day = d.getDay();
          return (
            <div key={index} className="mr-3" >
              <button onClick={() => { setSchedule(schedule); setCalue(index) }}
                style={{
                  backgroundColor: calue === index ? 'lightblue' : 'white'
                }}
              >
                {date.split("-")[1] + "-" + date.split("-")[2] + " " + days[day]}
              </button>
            </div>
          );
        })}
      </div>
      {schedule && <Ticket setPrice={setPrice} setOpen={setOpen} schedule={schedule} setSessionId={setSessionId} />}
    </div>
  );
};
export default Session;
