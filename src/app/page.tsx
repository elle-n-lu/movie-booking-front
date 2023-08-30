"use client"
import Body from '@/components/body'
import Movie from '@/movies/page'
import Nav from '@/nav/page'
import Seat, { seat_p } from '@/seats/seat'
import Session from '@/sessions/page'
import { useEffect, useState } from 'react'

export default function Home() {
  const [cinemeId, setCinemaId] = useState(1)
  const [seatId, setSeatId] = useState(1)
  const [schedules, setSchedules] = useState<any[]>([])
  const [seats, setSeats] = useState<seat_p[]>([]);
  const [sessions, setSessions] = useState<any[]>([])
  const [calue, setCalue] = useState<any>(-1)
  const body=(cinemeId:any,item:any, setItem:any,user:any, setUser:any,token:any, setToken:any,schedule:any, setSchedule:any)=>(
    <>
    <Seat setMovieCalue={setCalue} seats={seats} setSchedule={setSchedule}  setSeats={setSeats} cinemaId={cinemeId} setSeatId={setSeatId} setItem={setItem} />
      <Movie  calue={calue} setCalue={setCalue}  token={token} seatId={seatId} setSchedule={setSchedule}  item={item} setItem={setItem} cinemaId={cinemeId} setSchedules={setSchedules} setSession={setSessions} />
      <Session user={user} schedule={schedule} setSchedule={setSchedule} token={token} cinemeId={cinemeId} totalseats={seats}  schedules={schedules} />
    </>
  )
  return (
    <div >
      <Body body={(cinemeId:any,item:any, setItem:any,user:any, setUser:any,token:any, setToken:any,schedule:any, setSchedule:any)=>body(cinemeId,item, setItem,user, setUser,token, setToken,schedule, setSchedule)} />
    </div>
  )
}
