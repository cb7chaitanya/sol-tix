'use client'
import Link from 'next/link';
import React, { useEffect } from 'react'
import { PiCalendarDotsDuotone } from "react-icons/pi";
import { Button } from '../ui/button';
import axios from 'axios';
import { useParams } from 'next/navigation';
import NoEvents from './noEvents';
import Events from './events';
import { Event } from '@prisma/client';

const UserEvents =  () => {
  const params = useParams()
  const profileId = params.profileId
  const [eventsAttended, setEventsAttended] = React.useState<Event[]>([])
  const [eventsHosted, setEventsHosted] = React.useState<Event[]>([])
  const fetchEvents = async() => {
    const res = await axios.get(`http://localhost:3000/api/user/${profileId}`)
    console.log(res.data.events)
    setEventsAttended(res.data.eventsAttended)
    setEventsHosted(res.data.eventsHosted)
    return res.data
  }
  useEffect(() => {
    fetchEvents()
  }, [])
  return (
    <div className='flex justify-center items-center flex-col gap-1'>
    {eventsAttended?.length > 0 && eventsHosted?.length > 0 ? (
      <Events eventsHosted={eventsHosted} eventsAttended={eventsAttended} />
    ) : (
      <NoEvents/>
    )}
  </div>
  )
}

export default UserEvents