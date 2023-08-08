import { schedule, session } from "@/movies/page";
import React from "react";

interface pageProps {
  schedules: schedule[];
  sessions: session[];
  setSessions: (session: session[]) => void;
}
const Session: React.FC<pageProps> = ({ schedules, sessions, setSessions }) => {
  return (
    <div>
      {schedules.map((schedule, index) => {
        return (
          <div key={index}>
            {schedule.sessions.map((session, index1) => (
              <div key={index1} className="flex items-center mt-2">
                {session.session_time}
                <button className="p-2 text-xs ml-2 bg-orange-400">
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
