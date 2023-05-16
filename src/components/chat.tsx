import React from "react";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { ChatMessage } from "./message";

import useStore from "@/store/useStore";

import { api } from "@/utils/api";
import { ScrollArea } from "./ui/scroll-area";

const Chat = () => {
  const { currentTopic } = useStore();

  const { data, isError, isLoading } = api.ai.getChatLog.useQuery({
    topic: currentTopic!,
  });

  return (
    <div className="main flex flex-1 flex-col">
      <div className="heading flex-2 hidden lg:block">
        <h1 className="mb-4 text-3xl text-gray-700">{currentTopic}</h1>
      </div>

      <div className="flex h-full flex-1">
        <div className="chat-area flex flex-1 flex-col">
          <ScrollArea className="messages flex-1 overflow-auto">
            {data?.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </ScrollArea>
          <div className="flex-2 pb-10 pt-4">
            <div className="write flex rounded-lg bg-white shadow">
              <div className="flex-3 flex content-center items-center p-4 pr-0 text-center">
                <span className="block text-center text-gray-400 hover:text-gray-800">
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                  >
                    <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </span>
              </div>

              <div className="flex-1">
                <textarea
                  name="message"
                  className="block w-full bg-transparent px-4 py-4 outline-none"
                  rows={1}
                  placeholder="Type a message..."
                  autoFocus
                ></textarea>
              </div>

              <div className="flex-2 flex w-32 content-center items-center p-2">
                <div className="flex-1 text-center">
                  <span className="text-gray-400 hover:text-gray-800">
                    <span className="inline-block align-text-bottom">
                      <svg
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        className="h-6 w-6"
                      >
                        <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                      </svg>
                    </span>
                  </span>
                </div>
                <div className="flex-1">
                  <button className="inline-block h-10 w-10 rounded-full bg-blue-400">
                    <span className="inline-block align-text-bottom">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        className="h-4 w-4 text-white"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
