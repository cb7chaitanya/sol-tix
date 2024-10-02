import Link from 'next/link'
import React from 'react'
import { PiCalendarDotsDuotone } from 'react-icons/pi'
import { Button } from '../ui/button'

const NoEvents = () => {
  return (
    <div>
        <div className='flex justify-center items-center'>
            <div className='relative'>
                <PiCalendarDotsDuotone className='relative text-white text-5xl lg:text-7xl'/>
                <div className='absolute right-0 bg-white p-0.5 text-zinc-800 top-0 rounded-sm lg:p-1 font-semibold'>0</div>
            </div>
        </div>
        <div className='text-white text-lg font-semibold'>No Upcoming Events</div>
        <Link href='/create'><Button className="bg-zinc-800 text-white px-4 py-2 text-lg md:text-lg rounded-xl hover:bg-zinc-700 duration-300">Create a new event</Button></Link>
    </div>
  )
}

export default NoEvents