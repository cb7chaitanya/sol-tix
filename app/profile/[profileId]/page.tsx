import UserDetail from '@/components/userDetail'
import UserEvents from '@/components/userEvents'
import React from 'react'

const page = () => {
  
  return (
    <div className='min-h-screen w-3/4 lg:w-1/2 flex flex-col gap-16'>
        <UserDetail />
        <UserEvents />
    </div>
  )
}

export default page