"use client";
import React, { useState } from "react";
import AiChatBox from "../AiChatBox/AiChatBox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { openAiChat } from "@/redux/slices/uiSlice";

export const AiChatBubble = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.ui.aiChatOpen
  );
  
  if (isOpen) {
    return <AiChatBox />;
  }
  return (
    <button
      onClick={() => dispatch(openAiChat())}
      className="fixed bottom-14 right-5 w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
    >
      AI
    </button>
  );
};
