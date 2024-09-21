import { getServerSession } from 'next-auth'
import React from 'react'

const page = async() => {
  const session = await getServerSession()
  return (
    <div className='min-h-screen w-full lg:w-1/2'>
        <div className=''>
          <h1 className='text-white text-2xl lg:text-3xl font-semibold tracking-tight'>{session?.user?.name}</h1>
        </div>
    </div>
  )
}

export default page