"use client"
import Movie from '@/movies/page'
import Nav from '@/nav/page'
import Schedule from '@/schedules/page'
import Session from '@/sessions/page'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [cinemeId,setCinemaId]=useState(1)
  const [schedules, setSchedules]=useState<any[]>([])
  const [sessions, setSessions]=useState<any[]>([])
  const [item, setItem] = useState(0);
  // console.log('sched',schedules)
  return (
    <div >
      <Nav setItem={setItem}  cinemaId={cinemeId} setCinemaId={setCinemaId} />
      <Movie item={item} setItem={setItem}  cinemaId={cinemeId} setSchedules={setSchedules} setSession={setSessions} />
      <Schedule schedules={schedules}  />
      <Session sessions={sessions} setSessions={setSessions} schedules={schedules} />
    </div>
  )
}
