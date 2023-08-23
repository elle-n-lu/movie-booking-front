import { api_url } from '@/api';
import React, { useEffect, useState } from 'react'
interface commentsProps {
    movieid: string
}
interface comment {
    id: number
    message: string
    parent_comment_id: number
    user_id: number
}
const Comments: React.FC<commentsProps> = ({ movieid }) => {
    const [comments, setComments] = useState<comment[]>([])
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
    useEffect(() => {
        fetchcomments()
    }, [])
    return (
        <div className='w-1/2 pl-8'>
            <h1 className='font-bold text-xl'>Comments</h1>
            {comments && <>{
                comments.map((comment, index)=>(
                    <div key={index} className='flex justify-between'>
                        {comment.user_id}:{comment.message}
                        <button className='text-green-600'>Reply</button>
                    </div>
                ))
            }</>}
        </div>
    )
}
export default Comments