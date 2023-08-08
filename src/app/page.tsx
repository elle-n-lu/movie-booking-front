"use client"
import Movie from '@/movies/page'
import Nav from '@/nav/page'
import Schedules from '@/schedules/schedules'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [cinemeId,setCinemaId]=useState(1)
  return (
    <div >
      <Nav cinemaId={cinemeId} setCinemaId={setCinemaId} />
      <Movie cinemaId={cinemeId} />
      <Schedules />
    </div>
  )
}
