import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="flex flex-col w-full">
      <div className="h-[50px] bg-[#5d5b8d] flex items-center justify-between p-[10px] text-gray-100">
        <span>{data.user?.displayName}</span>
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
