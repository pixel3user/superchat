import React from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"

const Sidebar = ({showMenu,setshowMenu}) => {
  return (
    <div className={`bg-[#3e3c61] relative w-full ${!showMenu && "hidden"} sm:block sm:w-1/5`}>
      <Navbar />
      <Search/>
      <Chats setshowMenu={setshowMenu}/>
    </div>
  );
};

export default Sidebar;
