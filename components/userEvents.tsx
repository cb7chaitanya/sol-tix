'use client'
import Link from 'next/link';
import React, { useEffect } from 'react'
import { PiCalendarDotsDuotone } from "react-icons/pi";
import { Button } from './ui/button';
import axios from 'axios';
import { useParams } from 'next/navigation';

const UserEvents =  () => {
  const params = useParams()
  const profileId = params.profileId
  const [events, setEvents] = React.useState([])
  const fetchEvents = async() => {
    const res = await axios.get(`http://localhost:3000/api/user/${profileId}`)
    console.log(res.data)
    return res.data
  }
  useEffect(() => {
    fetchEvents()
  }, [])
  return (
    <div className='flex justify-center items-center flex-col gap-1'>
        <div className='relative'>
          <PiCalendarDotsDuotone className='text-white text-5xl lg:text-7xl'/>
          <div className='absolute right-0 bg-white p-0.5 text-zinc-800 top-0 rounded-sm lg:p-1'>0</div>
        </div>
        <div className='text-white text-lg font-semibold'>No Upcoming Events</div>
        <Link href='/create'><Button className="bg-zinc-800 text-white px-4 py-2 text-lg md:text-lg rounded-xl hover:bg-zinc-700 duration-300">Create a new event</Button></Link>
    </div>
  )
}

export default UserEvents