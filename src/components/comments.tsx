import { api_url } from '@/api';
import React, { useEffect, useState } from 'react'
interface commentsProps {
    movieid: string
    token: string | null
    userid: string | null
}
interface comment {
    id: number
    message: string
    parent_comment_id: number
    user_id: number,
    user: {
        username: string
    }
}
const Comments: React.FC<commentsProps> = ({ movieid, token, userid }) => {
    const [comments, setComments] = useState<comment[]>([])
    const [replyshow, setReplyshow] = useState(false)
    const [replycomment, setReplycomment] = useState("")
    const [childComment, setChildComments] = useState<comment[]>([])
    const [childShow, setChildshow] = useState(false)
    const [downbutton, setDownbutton] = useState(true)
    const [val, setVal] = useState(-1)

    const fetchcomments = async () => {
        await api_url
            .get("/movies/" + movieid + "/comments",)
            .then((res) => {

                setComments(res.data);
            })
            .catch((err) => {
                console.log("errr", err.response.data)
            });
    }
    const fetchChildComments = async (p_id: number) => {
        await api_url
            .get("/movies/" + movieid + "/comments/" + p_id,)
            .then((res) => {
                console.log('child res', res)
                if (res.data !== 'no such comment') {
                    setChildComments(res.data);
                }
            })
            .catch((err) => {
                console.log("errr", err.response.data)
            });
    }
    const reply = async (parentId: number) => {
        const formData = new FormData();
        formData.append("message", replycomment);
        await api_url
            .post("/movies/" + movieid + "/comments/" + parentId, formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                })
            .then((res) => {
                window.location.reload()
                console.log('replied')
            })
            .catch((err) => {
                console.log("errr", err.response.data)
            });
    }
    useEffect(() => {
        fetchcomments()
    }, [])
    return (
        <div className='w-full'>
            <h1 className='font-bold text-xl'>Comments</h1>
            {comments && <div className='grid grid-cols-auto border'>{
                comments.map((comment, index) => (
                    <div key={index} className='grid grid-cols-7 border-b'>
                        <div className='p-2 border-r'>{comment.user.username}
                        </div>
                        <div className='col-span-5 text-left p-2 '>
                            <div className='flex justify-between border-b'>
                                <p>{comment.message}</p>
                                <button className='text-green-600' onClick={(e) => {
                                    e.preventDefault()
                                    userid ? (setVal(index), setReplyshow((prevReplyshow) => !prevReplyshow)) : alert("login required")
                                }}>Reply</button>
                            </div>
                            {replyshow && val === index  && 
                            <form className='flex flex-col mt-2' onSubmit={(e) => { e.preventDefault(); reply(comment.id) }}>
                                <textarea
                                    value={replycomment}
                                    onChange={(e: any) => {
                                        setReplycomment(e.target.value);
                                    }}
                                    name="replycomment"
                                    className=" bg-gray-50 h-20 w-3/4 border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block p-2.5"
                                    placeholder="reply a comment"
                                    required
                                />
                                <button
                                    className="w-1/4 h-10 mt-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-1 text-center "
                                    type='submit'>Submit</button>
                            </form>}
                            {
                                childShow && val === index && <div className='mt-4'>
                                    {
                                        childComment.map((com, index) => (
                                            <div key={index} className='mt-2'>
                                                <strong>{com.user.username}</strong> reply: {com.message}
                                                {/* <button className='text-green-600 ml-6' onClick={(e) => {
                                                    e.preventDefault()
                                                    userid ? (setVal(index), setReplyshow((prevReplyshow) => !prevReplyshow)) : alert("login required")
                                                }}>Reply</button> */}
                                            </div>
                                        ))
                                    }
                                </div>
                            }

                        </div>
                        <div className='p-2 '>

                            <button onClick={(e) => {
                                e.preventDefault();
                                setVal(index);
                                // setDownbutton(false)
                                setChildComments([])
                                setChildshow(val === index ? (prevChildshow) => !prevChildshow : true);
                                fetchChildComments(comment.id)
                            }}>^</button>
                        </div>

                    </div>
                ))
            }</div>}

        </div>
    )
}
export default Comments