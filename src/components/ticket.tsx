import { schedule } from '@/movies/page';
import React from 'react'
interface ticketsProps {
    schedule: schedule;
    setOpen:(open: boolean)=>void
    setSessionId:(sessionId: number)=>void
    setPrice:(price: number)=>void
}
const Ticket: React.FC<ticketsProps> = ({schedule, setOpen,setSessionId,setPrice})=>{
    return (

        <div className="flex flex-col">
              {schedule.sessions.map((session, index1) => (
                <div key={index1} className="flex mb-4 justify-evenly" id={`${session.id}`}>
                  <label className='px-2'>{session.session_time}</label>
                  {/* session.price */}
                  <label className='px-4 text-orange-500'>$ {session.price}</label>
                  <button
                    className="p-2 text-xs ml-2 bg-orange-400"
                    onClick={() => {
                      setOpen(true);
                      setSessionId(session.id);
                      setPrice(session.price)
                    }}
                  >
                    Ticket
                  </button>
                </div>
              ))}
            </div>
    )
}
export default Ticket