import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='flex items-center bg-[#2f2d52] h-[50px] p-[10px] justify-between text-[#ddddf7]'>
      <span className="font-bold hidden lg:block">Super Chat</span>
      <div className="flex m-[10px]">
        <img className='bg-[#ddddf7] w-8 h-8 border rounded-full object-cover' src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button className='bg-[#5d5b8d] text-[#ddddf7] text-[10px] cursor-pointer absolute lg:relative bottom-[10px]' onClick={()=>signOut(auth)}>logout</button>
      </div>
    </div>
  )
}

export default Navbar