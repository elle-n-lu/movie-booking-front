import Nav from '@/nav/page'
import React, { useEffect, useState } from 'react'
interface bodyProps {
body:any
}
const Body: React.FC<bodyProps> = ({body})=>{
    const [cinemeId, setCinemaId] = useState(1)
  const [item, setItem] = useState(0);
  const [userId, setUserId] = useState<number | undefined>()
  const [user, setUser] = useState<string | undefined>()
  const [token, setToken] = useState<string | undefined>()
  const [schedule, setSchedule] = useState<any>()
  
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("access") && localStorage.getItem("user")) {
      setToken(localStorage.getItem("access") as string)
      setUserId(JSON.parse(localStorage.getItem("user") as string).id)
      setUser(JSON.parse(localStorage.getItem("user") as string).name)
    }
  }, [])


    return (
    <div>
      <Nav setToken={setToken} setSchedule={setSchedule}  setUserId={setUserId} setUser={setUser} user={user} setItem={setItem} cinemaId={cinemeId} setCinemaId={setCinemaId} />
        {body(cinemeId, item, setItem,userId, setUserId,user, setUser,token, setToken,schedule, setSchedule)}
    </div>)
}
export default Body