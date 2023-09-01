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
    const movieid = searchParams.get("id") ?? ""; // default value is "1"
    const userid = window.localStorage.getItem("user") ? searchParams.get("user") : ""; // default value is "1"
    const token = window.localStorage.getItem("user") ? searchParams.get("token") : ""; // default value is "1"

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
            })
            .catch((err) => {
                console.log("errr", err.response.data)
            });
    }

    const sendComment = async () => {

        const formData = new FormData();
        formData.append("message", comment);
        await api_url
            .post("/movies/" + movieid + "/comments", formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                })
            .then((res) => {
                window.location.reload()
                console.log('comment sent')
            })
            .catch((err) => {
                console.log("errr", err.response.data)
                if (err.response.status == 401) {
                    console.log('error')
                }
            });
    };
    const sendvote = async (vote: string) => {
        const formData = new FormData();
        formData.append("vote_status", vote)
        if (votestatus) {
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
                    }
                });
        }
    }
    useEffect(() => {
        getsinglemovie();
        getVotestatus()
    }, [userid]);

    const body = (item: any, setItem: any, user: any, setUser: any, setToken: any, schedule: any, setSchedule: any) => (
        <div className="mx-auto md:w-1/2 sm:w-3/4 w-full sm:px-0 px-4">
            {movieinfo ? (
                <>
                    <div className="flex py-4">
                        <img
                            src={movieinfo.movie.movie_poster}
                            style={{ width: "200px", objectFit: "contain" }}
                        />
                        <div className="px-4">
                            <p><strong className="text-gray-400">Title: </strong>{movieinfo.movie.movie_name}</p>
                            <strong className="text-gray-400">Introduction: </strong>
                            <p>{movieinfo.movie.introduction}</p>
                            <div className="flex ">

                                <button className=" p-1 rounded-lg border" onClick={(e) => {
                                    userid ? sendvote('true') : alert('login required')
                                }}>
                                    <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                    </svg>
                                </button>
                                <div className="p-1">{movieinfo.vote_up ? <label>{movieinfo.vote_up} </label> : <></>}</div>
                                <button className="ml-2  p-1 rounded-lg border" onClick={() => {
                                    userid ? sendvote('false') : alert('login required')
                                }}>
                                    <svg className="h-6 w-6 text-gray-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 17l-4 4m0 0l-4-4m4 4V3"/>
</svg>
                                    </button>
                                    <div className="p-1"> {movieinfo.vote_down ? <label>{movieinfo.vote_down} </label> : <></>}</div>
                            </div>
                        </div>
                    </div>
                    <form
                        className="space-y-4 md:space-y-6 pr-2"
                        onSubmit={(e) => { e.preventDefault(); userid ? sendComment() : alert('login required') }}
                    >
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">
                            write a comment:
                        </label>
                        <div className="flex flex-col pb-4">
                            <textarea
                                value={comment}
                                onChange={(e: any) => {
                                    setComment(e.target.value);
                                }}
                                name="comment"
                                className=" bg-gray-50 h-28 w-3/4 border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block p-2.5 mb-4"
                                placeholder="write a comment"
                                required
                            />
                            <button
                                type="submit"
                                className="w-1/4 h-10 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-1 text-center "
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                    <Comments movieid={movieid} token={token} userid={userid} />
                </>
            ) : (<>loadinh....</>)}
        </div>
    )
    return (
        <>


            <Body body={(item: any, setItem: any, user: any, setUser: any, token: any, setToken: any, schedule: any, setSchedule: any) => body(item, setItem, user, setUser, setToken, schedule, setSchedule)} />

        </>
    );
};
export default Movieinfo;
