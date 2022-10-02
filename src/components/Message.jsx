import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`flex w-full m-[20px] mb-[20px] ${message.senderId === currentUser.uid && "flex-row-reverse"}`}
    >
      <div className="flex flex-col text-gray-500 font-normal">
        {/* <img
          className="w-[40px] h-[40px] border rounded-full object-cover"
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        /> */}
        <div className="flex flex-col text-sm">
          {/* <span className="mx-1">{message.date.toDate().toDateString().slice(4)}</span> */}
          {/* <span>{message.date.toDate().toLocaleTimeString('en-US').slice(0,5)}{message.date.toDate().toLocaleTimeString('en-US').slice(8)}</span> */}
        </div>
      </div>
      <div className={`flex flex-col m-[10px] max-w-[80%] ${message.senderId === currentUser.uid && "items-end"}`}>
        <p className={`bg-white py-[10px] px-[10px] rounded-xl max-w-fit ${message.senderId === currentUser.uid && "bg-[#8da4f1] text-white"}`}>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
        <span className="text-[12px]">{message.date.toDate().toLocaleTimeString('en-US').slice(0,5)}{message.date.toDate().toLocaleTimeString('en-US').slice(8)}{message.date.toDate().toDateString().slice(3)}</span>
      </div>
    </div>
  );
};

export default Message;
