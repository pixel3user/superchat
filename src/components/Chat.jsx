import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = ({showMenu,setshowMenu}) => {
  const { data } = useContext(ChatContext);

  return (
    <div className={`flex flex-col ${showMenu && "hidden"} w-full sm:w-4/5`}>
      <div className="w-full h-[50px] bg-[#5d5b8d] flex items-center justify-between p-[10px] text-gray-100">
        <div className="flex flex-row items-center">
          <img onClick={() => setshowMenu(prev => !prev)} className="w-9 mr-3 hover:cursor-pointer" src="/images/menu.svg" />
          <span className="text-gray-200">{data.user?.displayName}</span>
        </div>
        <div className="flex m-[10px]">
          <img className="h-[24px] cursor-pointer" src={Cam} alt="" />
          <img className="h-[24px] cursor-pointer" src={Add} alt="" />
          <img className="h-[24px] cursor-pointer" src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;
