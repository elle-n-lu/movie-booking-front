import Nav from '@/nav/page'
import React, { useEffect, useState } from 'react'
interface bodyProps {
body:any
}
export interface user{
  id:number
  name:string
}
const Body: React.FC<bodyProps> = ({body})=>{
    const [cinemeId, setCinemaId] = useState(1)
  const [item, setItem] = useState(0);
  const [user, setUser] = useState<user>()
  const [token, setToken] = useState<string | undefined>()
  const [schedule, setSchedule] = useState<any>()
  
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("access") && localStorage.getItem("user")) {
      setToken(localStorage.getItem("access") as string)
      setUser(JSON.parse(localStorage.getItem("user") as string) as user)
    }
  }, [])


    return (
    <div>
      <Nav setToken={setToken} setSchedule={setSchedule} setUser={setUser} user={user} setItem={setItem} cinemaId={cinemeId} setCinemaId={setCinemaId} />
        {body(cinemeId, item, setItem,user, setUser,token, setToken,schedule, setSchedule)}
    </div>)
}
export default Body