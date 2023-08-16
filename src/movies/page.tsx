import { api_url } from "@/api";
import SlideBbuttons from "@/components/slide_buttons";
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
  schedules: schedule[];
}
interface pageProps {
  seatId:number
  item: number;
  setItem: (item: number) => void;
  cinemaId: number;
  setSchedules: (schedules: schedule[]) => void;
  setSession: (session: session[]) => void;
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
}) => {
 
  const [movielist, setMovielist] = useState<any[]>([]);
  // console.log('seatid',seatId)
  const getmovies = async () => {
    await api_url
      .get("/ajax_movies/" +seatId+'/'+ cinemaId)
      .then((res) => {
        setMovielist(movieslicer(res.data));
        setSchedules(res.data[0] ? res.data[0].schedules : []);
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

  useEffect(() => {
    getmovies();
  }, [cinemaId,seatId]);


  const body = (item: number) => {
    if (movielist.length > 0) {
      return (
        <div className="flex">
          {movielist[item].map((movie: movie, index: number) => (
            <div
              key={index}
              onClick={(e) => {
                e.preventDefault();
                setSchedules(movie.schedules);
              }}
            >
              <button className="border-blue-400 p-2 mx-2 border hover:bg-blue-400 hover:text-white">
                {movie.movie_name}
              </button>
            </div>
          ))}
        </div>
      );
    } else {
      return <div>loading</div>;
    }
  };

  return (
    <div>
      <SlideBbuttons
        item={item}
        setItem={setItem}
        data={movielist}
        body={(item) => body(item)}
      />
    </div>
  );
};
export default Movie;
