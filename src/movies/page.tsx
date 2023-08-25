import { api_url } from "@/api";
import SlideBbuttons from "@/components/slide_buttons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
export interface session {
  session_time: string;
  id: number
}

export interface schedule {
  schedule_date: string;
  sessions: session[];
}
interface movie {
  id: number;
  introduction: string;
  movie_name: string;
  movie_poster:string
  schedules: schedule[];
}
interface pageProps {
  seatId:number
  item: number;
  setItem: (item: number) => void;
  cinemaId: number;
  setSchedules: (schedules: schedule[]) => void;
  setSession: (session: session[]) => void;
  setSchedule:(schedule:any)=>void
  token:string | undefined
  userid: number | undefined
  setCalue:(calue:number)=>void
  calue:number
}
const movieslicer = (movie: any) => {
  const movieslist = [];
  let n;
  if (movie.length <= 2) {
    movieslist.push(movie);
    return movieslist;
  } else {
    n = Math.floor(movie.length / 2); //n=3, movies = 13
    for (let i = 0; i < movie.length; i += n) {
      // i= 0,4,8,12
      movieslist.push(movie.slice(i, i + n));
    }
    return movieslist;
  }
};
const Movie: React.FC<pageProps> = ({
  seatId,
  item,
  setItem,
  cinemaId,
  setSchedules,
  setSession,
  setSchedule,
  token,
  userid,calue, setCalue
}) => {
 
  const [movielist, setMovielist] = useState<any[]>([]);
  const getmovies = async () => {
    await api_url
      .get("/ajax_movies/" +seatId+'/'+ cinemaId)
      .then((res) => {
        setMovielist(movieslicer(res.data));
        setSchedules( []);
        setSession(
          res.data[0]
            ? res.data[0].schedules
              ? res.data[0].schedules.sessions
              : []
            : []
        );
      })
      .catch((err) => console.log("errr", err));
  };
  const getschedules = async (movieId:any) => {
    await api_url
      .get("/ajax_schedules/" + cinemaId+'/'+seatId+'/'+movieId)
      .then((res) => {
        console.log('schedule',res)
        setSchedules(res.data);
      })
      .catch((err) => console.log("errr", err));
  };
  useEffect(() => {
    getmovies();
  }, [cinemaId,seatId]);

  // const [calue, setCalue] = useState(-1)
  const body = (item: number) => {
    if (movielist.length > 0) {
      return (
        <>
          {movielist[item].map((movie: movie, index: number) => (
            <div
              key={index}
              onClick={(e) => {
                e.preventDefault();
                getschedules(movie.id)
                setSchedule(null)
              }}
              className="px-2 text-center"
            >
             <Link href={{pathname:"/movieinfo",query:{
              id:movie.id,
              token: token,
              user:userid
             }}}  > <img src={movie.movie_poster} className="mx-auto" style={{width:'150px',height:"220px",objectFit:'contain'}} /></Link>
              <button className=" p-2 m-2   "
              onClick={()=>setCalue(index)}
              style={{
                backgroundColor: calue === index ? 'lightblue' : 'white',
                width:"150px"
              }}
              >
                {movie.movie_name}
              </button>
            </div>
          ))}
        </>
      );
    } else {
      return <div>loading</div>;
    }
  };
  return (
    <>
      <SlideBbuttons
        item={item}
        setItem={setItem}
        data={movielist}
        body={(item) => body(item)}
        setCalue={setCalue}
      />
    </>
  );
};
export default Movie;
