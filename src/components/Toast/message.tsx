"use client"
import React, { useEffect } from "react";
import { createPortal } from 'react-dom';


import { Message } from "@/libs/types";


export default function MessageToast({ messages, setMessages }: {
  messages: Message[],
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}) {
  useEffect(() => {
    setTimeout(() => {
      if (messages.length > 0) {
        setMessages(messages.slice(1));
      } else {
        setMessages([]);
      }
    }, 3000);
  }, [messages])
  return (
    <>
      {createPortal(
        <div className="absolute z-[100] top-0 right-0 p-4 flex gap-2 flex-col">
          {messages.map((message: Message, index) => (
            <div
              onClick={() => {
                messages.splice(index, 1);
                setMessages([...messages]);
              }}
              key={message.name}
              className={
                `${message.type === "ERROR"
                  ? "bg-red-50 border-red-500 text-red-700"
                  : message.type === "SUCCESS"
                    ? "bg-green-50 border-green-500 text-green-700"
                    : message.type === "WARNING"
                      ? "bg-yellow-50 border-yellow-500 text-yellow-700"
                      : message.type === "INFO"
                        ? "bg-blue-50 border-blue-500 text-blue-700"
                        : "bg-gray-50 border-gray-500 text-gray-700"}
             border-2 p-2 rounded-lg min-w-[200px] min-h-[100px] flex flex-col gap-2`}
            >
              <h1 className="font-semibold">{message.name}</h1>
              <p>{message.message}</p>
            </div>
          ))}
        </div>,
        document.body)}
    </>
  );
}
