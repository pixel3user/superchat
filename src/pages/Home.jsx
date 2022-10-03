import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

const Home = () => {
  const [showMenu,setshowMenu] = useState(true)
  return (
    <div className='flex h-screen w-full sm:bg-dashboard-image justify-center items-center'>
      <div className="flex flex-row w-full lg:w-[75%] h-full lg:h-[80%] bg-white overflow-hidden">
        <Sidebar showMenu={showMenu} setshowMenu={setshowMenu}/>
        <Chat showMenu={showMenu} setshowMenu={setshowMenu}/>
      </div>
    </div>
  )
}

export default Home