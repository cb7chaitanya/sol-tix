import React from 'react'
import { Event } from '@prisma/client'

interface EventsProps {
    eventsHosted: Event[]
    eventsAttended: Event[]
}
const Events = ({ eventsHosted, eventsAttended }: EventsProps) => {
  return (
    <div className='text-white flex justify-center items-center gap-3'>
        <div>
            {eventsHosted?.map((event: any) => (
                <div key={event.id}>
                    {event.name}
                </div>
            ))}
        </div>
        <div>
            {eventsAttended?.map((event: any) => (
                <div key={event.id}>
                    {event.name}
                </div>
            ))}
        </div>
    </div>
  )
}

export default Events