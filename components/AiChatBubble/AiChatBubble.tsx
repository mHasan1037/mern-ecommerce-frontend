"use client";
import React, { useState } from "react";
import AiChatBox from "../AiChatBox/AiChatBox";

export const AiChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  if (isOpen) {
    return <AiChatBox setIsOpen={setIsOpen} />;
  }
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="fixed bottom-14 right-5 w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
    >
      AI
    </button>
  );
};
