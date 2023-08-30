"use client"
import { api_url } from '@/api'
import Body from '@/components/body'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
interface pageProps {

}
interface order {
    id: number
    seat: string
    total_price: number
    registed_date: string
    session: {
        session_time: string
        movie: {
            movie_name: string;
            movie_poster: string
        }
        schedule: {
            schedule_date: string
        }
        cinema: {
            cinema_name: string
        }
    }
}
const Order: React.FC<pageProps> = () => {
    const searchParams = useSearchParams();
    const router = useRouter()
    const userid = searchParams.get("id") ?? ""; // default value is ""
    const [orders, setOrders] = useState<order[]>([])
    const fetchmyorders = async () => {
        await api_url
            .get("orders/users/" + userid,)
            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => {
                console.log("errr", err.response.data)
            });
    }

    useEffect(() => {
        fetchmyorders()
        if (!localStorage.getItem("user")) {
            router.push('/')
        }
    }, [])
    const body = (cinemeId: any, item: any, setItem: any, user: any, setUser: any, token: any, setToken: any, schedule: any, setSchedule: any) =>
    (
        <div className="mt-10">
            <table className="border mx-auto text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className='px-6 py-3'>Order Date</th>
                        <th className='px-6 py-3'>cinema</th>
                        <th className='px-6 py-3'>movie</th>
                        <th className='px-6 py-3'>schedule</th>
                        <th className='px-6 py-3'>seat_no</th>
                        <th className='px-6 py-3'>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders && orders.map((order: order, index: number) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className='px-6 py-4'>
                                    {order.registed_date.slice(0, 10)}
                                </td>
                                <td className='px-6 py-4'>
                                    {order.session.cinema.cinema_name}
                                </td>
                                <td className='px-6 py-4'>
                                    {order.session.movie.movie_name}
                                </td>
                                <td className='px-6 py-4'>
                                    {order.session.session_time} {order.session.schedule.schedule_date.split(" ")[0]}</td>
                                <td className='px-6 py-4'>
                                    {order.seat}</td>
                                <td className='px-6 py-4'>
                                    $ {order.total_price}
                                </td>
                            </tr>
                        ))
                    }
                </tbody></table>
        </div>
    )



    return (
        <>
            <Body body={(cinemeId: any, item: any, setItem: any, user: any, setUser: any, token: any, setToken: any, schedule: any, setSchedule: any) => body(cinemeId, item, setItem, user, setUser, token, setToken, schedule, setSchedule)} />
        </>

    )
}
export default Order