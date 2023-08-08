import { schedule } from "@/movies/page";
import React from "react";
interface pageProps {
  schedules: schedule[];
}
const Schedule: React.FC<pageProps> = ({ schedules }) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex">
      {schedules?.map((schedule,index) => {
        const date = schedule.schedule_date.split(" ")[0];
        const d = new Date(date);
        const day = d.getDay();
        return <div key={index} className="mx-2 p-2">{date.split('-')[1] +'-'+ date.split('-')[2]+ " " + days[day]}</div>;
      })}
    </div>
  );
};
export default Schedule;
