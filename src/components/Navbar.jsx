import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='flex items-center bg-[#2f2d52] h-[50px] p-[10px] justify-between text-[#ddddf7]'>
      <span className="font-bold text-[12px] hidden lg:block">Super Chat</span>
      <div className="flex">
        <img className='bg-[#ddddf7] w-8 h-8 border rounded-full object-cover' src={currentUser.photoURL} alt="" />
        <span className='mx-2 items-center justify-center flex'>{currentUser.displayName}</span>
        <button className='flex items-center justify-center bg-[#5d5b8d] h-fit text-[10px] text-[#ddddf7] cursor-pointer lg:relative' onClick={()=>signOut(auth)}>logout</button>
      </div>
    </div>
  )
}

export default Navbar