import React from "react";
import { useSession } from "next-auth/react";
import { SendIcon, Loader2, SmileIcon, LockIcon } from "lucide-react";

import { ChatMessage } from "./message";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Default from "./default";

import { api } from "@/lib/api";
import useStore from "@/store/useStore";

const Chat = () => {
  const { currentTopic } = useStore();
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");

  const { data: session } = useSession();

  const { data, isError, isLoading, refetch } = api.ai.getChatLog.useQuery(
    {
      topic: currentTopic || "",
    },
    {
      enabled: !!currentTopic && !!session?.user.email,
    }
  );

  const addMessage = api.ai.sendMessage.useMutation({
    onSuccess: async () => {
      await refetch();
    },
    onMutate: async () => {
      await refetch();
    },
  });

  const handleSendMessage = async () => {
    try {
      setError("");
      if (!message) return;
      if (!session?.user) return;
      await addMessage.mutateAsync({ topic: currentTopic || "", message });
      setMessage("");
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
      setMessage("");
    } finally {
      setError("");
      setMessage("");
    }
  };

  return (
    <div className="flex h-full flex-auto flex-col p-6">
      <div className="flex h-full flex-auto flex-shrink-0 flex-col rounded-2xl bg-gray-100 p-4 dark:bg-slate-900">
        <div className="mb-4 flex h-full flex-col overflow-x-auto">
          <div className="flex h-full flex-col overflow-y-auto">
            <div className="relative grid grid-cols-12 gap-y-2">
              {data?.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex h-16 w-full flex-row items-center px-4 dark:text-white">
          {!session?.user ? (
            isLoading ? (
              <div className="flex items-center dark:text-slate-500">
                <LockIcon className="mr-4 h-5 w-5" /> Please login to chat
              </div>
            ) : (
              <div className="flex items-center dark:text-slate-500">
                Ai is Thinking{" "}
                <span>
                  <Loader2 className="ml-3 h-5 w-5 animate-spin" />
                </span>
              </div>
            )
          ) : null}
          {isError && <div className="text-red-600">Error</div>}
          {addMessage.isLoading && !isError ? (
            <div className="flex items-center dark:text-slate-500">
              {currentTopic} GPT is Thinking{" "}
              <span>
                <Loader2 className="ml-3 h-5 w-5 animate-spin" />
              </span>
            </div>
          ) : addMessage.isError ? (
            <div className="text-red-500">{error}</div>
          ) : null}
        </div>
        <div className="flex h-16 w-full flex-row items-center rounded-xl bg-white p-4 dark:bg-slate-800">
          <div className="ml-4 flex-grow">
            <div className="relative w-full">
              <Input
                type="text"
                spellCheck
                autoFocus
                className="flex h-10 w-full rounded-xl border pl-4 focus:outline-none dark:text-white"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeholder="Type a message..."
              />
              <Button
                variant="link"
                className="absolute right-0 top-0 flex h-full w-12 items-center justify-center text-gray-400"
              >
                <SmileIcon />
              </Button>
            </div>
          </div>
          <div className="ml-4">
            <Button
              variant="default"
              // disabled={!session?.user}
              onClick={() => void handleSendMessage()}
            >
              {session?.user ? (
                <SendIcon size={16} className="mr-3 text-white" />
              ) : (
                <LockIcon size={16} className="mr-3 text-white" />
              )}
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
