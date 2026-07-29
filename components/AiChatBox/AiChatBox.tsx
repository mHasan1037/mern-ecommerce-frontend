import { useState, useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/redux/store";
import { addUserMessage, sendChatMessage } from "@/redux/slices/aiChatSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { openAuthForm } from "@/redux/slices/uiSlice";
import OrderCard from "./AiOrderCard";
import ProductListCard from "./AiProductCard";

interface AiChatBoxProps {
  setIsOpen: (open: boolean) => void;
}

const AiChatBox = ({ setIsOpen }: AiChatBoxProps) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { messages, loading, error } = useSelector(
    (state: RootState) => state.chat,
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    dispatch(addUserMessage(trimmed));
    dispatch(sendChatMessage(trimmed));
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-green-600 hover:bg-green-700 text-white">
        <span className="font-medium">AI Chat</span>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-white/10 rounded-full p-1 transition-colors"
        >
          <IoClose />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 text-sm space-y-2"
      >
        {messages.length === 0 && (
          <p className="text-gray-500">Start chatting...</p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[80%] px-3 py-2 rounded-2xl ${
              msg.role === "user"
                ? "bg-green-600 text-white ml-auto"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            <p>{msg.content}</p>
            {msg.card?.type === "order" && <OrderCard card={msg.card} />}
            {msg.card?.type === "product_list" && (
              <ProductListCard card={msg.card} />
            )}

            {msg.link && (
              <Link
                href={msg.link}
                className="underline text-blue-600 block mt-1"
              >
                View details →
              </Link>
            )}
            {msg.action?.type === "open_auth_form" && msg.action && (
              <button
                onClick={() =>
                  dispatch(
                    openAuthForm({
                      form: msg.action!.form,
                      retry: msg.action!.retryIntent
                        ? {
                            intent: msg.action!.retryIntent!,
                            args: msg.action!.retryArgs,
                          }
                        : undefined,
                    }),
                  )
                }
                className="mt-2 rounded bg-mainBg2 px-3 py-1 text-white"
              >
                Log in
              </button>
            )}
          </div>
        ))}
        {loading && <p className="text-gray-400 italic">Thinking...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>

      <div className="p-3 border-t border-gray-200 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="px-4 py-2 text-sm rounded-full bg-green-600 text-white disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AiChatBox;
