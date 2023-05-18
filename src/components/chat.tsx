import React from "react";
import { Button } from "@/components/ui/button";
import { SendIcon, Loader2, SmileIcon } from "lucide-react";
import { ChatMessage } from "./message";

import useStore from "@/store/useStore";
import { useSession } from "next-auth/react";

import { api } from "@/utils/api";
import { Input } from "./ui/input";

const Chat = () => {
  const { currentTopic } = useStore();
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");

  const { data: session } = useSession();

  const { data, isError, isLoading, refetch } = api.ai.getChatLog.useQuery(
    {
      topic: currentTopic,
    },
    {
      enabled: !!currentTopic && !!session?.user,
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
      await addMessage.mutateAsync({ topic: currentTopic, message });
      setMessage("");
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
      setMessage("");
    }
  };

  return (
    <div className="flex h-full flex-auto flex-col p-6">
      <div className="flex h-full flex-auto flex-shrink-0 flex-col rounded-2xl bg-gray-100 p-4 dark:bg-slate-900">
        <div className="mb-4 flex h-full flex-col overflow-x-auto">
          <div className="flex h-full flex-col">
            <div className="grid grid-cols-12 gap-y-2">
              {data?.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex h-16 w-full flex-row items-center px-4 dark:text-white">
          {isLoading && <div>Loading...</div>}
          {isError && <div className="text-red-600">Error</div>}
          {addMessage.isLoading && (
            <div className="flex items-center dark:text-slate-500">
              Ai is Thinking{" "}
              <span>
                <Loader2 className="ml-3 h-5 w-5 animate-spin" />
              </span>
            </div>
          )}
          {addMessage.isError && <div className="text-red-500">{error}</div>}
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
              />
              <button className="absolute right-0 top-0 flex h-full w-12 items-center justify-center text-gray-400 hover:text-gray-600">
                <SmileIcon />
              </button>
            </div>
          </div>
          <div className="ml-4">
            <Button variant="default" onClick={() => void handleSendMessage()}>
              <SendIcon size={16} className="mr-3 text-white dark:text-black" />{" "}
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
