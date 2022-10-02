import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

const Home = () => {
  return (
    <div className='flex h-screen w-full bg-dashboard-image justify-center items-center'>
      <div className="flex w-full md:w-[75%] h-full md:h-[80%] bg-white overflow-hidden">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default Home