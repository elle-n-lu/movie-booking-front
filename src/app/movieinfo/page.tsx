"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api_url } from "@/api";
import Comments from "@/components/comments";
import Nav from "@/nav/page";
import Body from "@/components/body";
interface movieinfoProps {
}
interface vote {
    id: number;
    vote_status: boolean;
}
interface comment {
    id: number;
    parent_comment_id: number;
    message: string;
    rated_mark: string;
}
interface movieinfo {
    movie_name: string;
    introduction: string;
    movie_poster: string;
    comments: [];
    votes: [];
}
interface moviei {
    movie: movieinfo
    vote_up?: number;
    vote_down?: number;
}
const Movieinfo: React.FC<movieinfoProps> = () => {
    const searchParams = useSearchParams();
    const movieid = searchParams.get("id") ?? "1"; // default value is "1"
    const userid = searchParams.get("user") ?? ""; // default value is "1"
    const token = searchParams.get("token") ?? ""; // default value is "1"

    const [movieinfo, setMovieinfo] = useState<moviei>();
    const [comment, setComment] = useState("");
    const [votestatus, setVotestatus] = useState()
    const getsinglemovie = async () => {
        await api_url
            .get("/singlemovie/" + movieid)
            .then((res) => {
                setMovieinfo(res.data);
            })
            .catch((err) => console.log("errr", err));
    };

    const getVotestatus = async () => {
        await api_url
            .get("/singlemovie/" + movieid + "/" + userid,)
            .then((res) => {
                setVotestatus(res.data?.vote_id);
                // console.log('vote status', res.data)
            })
            .catch((err) => {
                console.log("errr", err.response.data)
            });
    }

    const sendComment = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("message", comment);
        await api_url
            .post("/movies/" + movieid + "/comments", formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                })
            .then((res) => {
                // setMovieinfo(res.data);
                window.location.reload()
                console.log('comment sent')
            })
            .catch((err) => {
                console.log("errr", err.response.data)
                if (err.response.status == 401) {
                    console.log('error')
                    // toast(err.response.data.msg)
                    // logout()
                    // Router.push('/login')
                }
            });
    };
    const sendvote = async (vote: string) => {
        const formData = new FormData();
        formData.append("vote_status", vote)
        if (votestatus) {
            console.log('sssssss')
            await api_url
                .put("/movies/" + movieid + "/votes/" + votestatus, formData,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                .then((res) => {
                    window.location.reload()

                    console.log('change voted')
                })
                .catch((err) => {
                    console.log("errr", err.response.data)
                    if (err.response.status == 401) {
                        console.log('error')
                        // toast(err.response.data.msg)
                        // logout()
                        // Router.push('/login')
                    }
                });
        } else {

            await api_url
                .post("/movies/" + movieid + "/votes", formData,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                .then((res) => {
                    window.location.reload()

                    console.log('voted')
                })
                .catch((err) => {
                    console.log("errr", err.response.data)
                    if (err.response.status == 401) {
                        console.log('error')
                        // toast(err.response.data.msg)
                        // logout()
                        // Router.push('/login')
                    }
                });
        }
    }
    useEffect(() => {
        getsinglemovie();
        getVotestatus()
    }, []);
    // console.log('info', movieinfo)
    const body=(item:any, setItem:any,user:any, setUser:any,token:any, setToken:any,schedule:any, setSchedule:any)=>(
        <>
         <div className="p-8">
            {movieinfo ? (
                <div>
                    <div className="flex w-full h-80">
                        <img

                            src={movieinfo.movie.movie_poster}
                            style={{ width: "300px", objectFit: "contain" }}
                        />
                        <div className="w-1/2 text-center">
                            <p>{movieinfo.movie.movie_name}</p>
                            <p>{movieinfo.movie.introduction}</p>
                            <button className="bg-green-300 p-2 rounded-lg" onClick={() => sendvote('true')}>up</button>{movieinfo.vote_up ? <label>{movieinfo.vote_up} </label> : <></>}
                            <button className="ml-2 bg-red-300 p-2 rounded-lg" onClick={() => sendvote('false')}>dw</button>{movieinfo.vote_down ? <label>{movieinfo.vote_down} </label> : <></>}
                        </div>
                    </div>
                    <div className="flex w-full p-6">
                        <form
                            className="space-y-4 md:space-y-6 w-1/2 pr-2"
                            onSubmit={sendComment}
                        >
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                write a comment:
                            </label>
                            <div className="flex ">
                                <textarea
                                    value={comment}
                                    onChange={(e: any) => {
                                        setComment(e.target.value);
                                    }}
                                    name="comment"
                                    className=" bg-gray-50 h-28 w-3/4 border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block p-2.5"
                                    placeholder="write a comment"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-1/4 ml-4 h-10 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-1 text-center "
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                        <Comments movieid={movieid} />
                    </div>
                </div>
            ) : (<>loadinh....</>)}
        </div>
        </>
      )
    return (
        <>
        
        
      <Body body={(item:any, setItem:any,user:any, setUser:any,token:any, setToken:any,schedule:any, setSchedule:any)=>body(item, setItem,user, setUser,token, setToken,schedule, setSchedule)} />

        </>
    );
};
export default Movieinfo;
