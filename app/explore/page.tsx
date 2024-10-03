import axios from 'axios'
import Link from 'next/link'
import React from 'react'

const page = async() => {
    const res = await axios.get('http://localhost:3000/api/events')
    const events = res.data.events
  return (
    <div className='min-h-screen'>
        {events?.map((event: any) => (
            <div key={event.id}>
                <Link href={`/event/${event.id}`}>
                    <h1>{event.name}</h1>
                </Link>
            </div>
        ))}
    </div>
  )
}

export default page