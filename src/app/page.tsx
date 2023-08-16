"use client"
import Movie from '@/movies/page'
import Nav from '@/nav/page'
import Seat, { seat_p } from '@/seats/seat'
import Session from '@/sessions/page'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {
  const [cinemeId,setCinemaId]=useState(1)
  const [seatId,setSeatId]=useState(1)
  const [schedules, setSchedules]=useState<any[]>([])
  const [seats, setSeats] = useState<seat_p[]>([]);
  const [sessions, setSessions]=useState<any[]>([])
  const [item, setItem] = useState(0);
  const [userId, setUserId]=useState<number | undefined>()
  const [user, setUser]=useState<string | undefined>()
  const [token, setToken]=useState<string | undefined>()
  useEffect(()=>{
    if (typeof window !== "undefined" && localStorage.getItem("access") && localStorage.getItem("user")) {
     setToken(localStorage.getItem("access") as string) 
     setUserId(JSON.parse(localStorage.getItem("user") as string).id)
     setUser(JSON.parse(localStorage.getItem("user") as string).name)
    }
  }, [])
  console.log('nam',user)
  return (
    <div >
      <Nav setToken={setToken} setUserId={setUserId} setUser={setUser} user={user} setItem={setItem}  cinemaId={cinemeId} setCinemaId={setCinemaId} />
      <Seat seats={seats} setSeats={setSeats} cinemaId={cinemeId} setSeatId={setSeatId}  setItem={setItem} />
      <Movie seatId={seatId} item={item} setItem={setItem}  cinemaId={cinemeId} setSchedules={setSchedules} setSession={setSessions} />
      <Session token={token} userId={userId} cinemeId={cinemeId} totalseats={seats} sessions={sessions} setSessions={setSessions} schedules={schedules} />
    </div>
  )
}
