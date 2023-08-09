import Link from 'next/link'
import React from 'react'
interface pageProps {

}
const page: React.FC<pageProps> = ()=>{
    return <div>
        <button className='bg-red-300 p-2 hover:bg-red-400'><Link href="/">Back to home</Link></button>
        this is sub router
    </div>
}
export default page