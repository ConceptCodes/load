import React from "react";
import { Button } from "@/components/ui/button";
import { SendIcon, Loader2 } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { ChatMessage } from "./message";

import useStore from "@/store/useStore";
import { useSession } from "next-auth/react";

import { api } from "@/utils/api";
import { ScrollArea } from "./ui/scroll-area";
import { TRPCClientError } from "@trpc/client";

const Chat = () => {
  const { currentTopic } = useStore();
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");

  const { data: session } = useSession();

  const { data, isError, isLoading, refetch } = api.ai.getChatLog.useQuery(
    {
      topic: currentTopic!,
    },
    {
      enabled: !!currentTopic && !!session?.user,
    }
  );

  const addMessage = api.ai.sendMessage.useMutation({
    onSuccess: async () => {
      await refetch();
    },
    onMutate: async ({ topic, message }) => {
      await refetch();
    },
  });

  const handleSendMessage = async () => {
    try {
      setError("");
      await addMessage.mutateAsync({ topic: currentTopic!, message });
      setMessage("");
    } catch (error) {
      console.log(error);
      if (error instanceof TRPCClientError) {
        setError(error.message);
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="main flex flex-1 flex-col">
      <div className="heading flex-2 hidden lg:block">
        <h1 className="mb-4 text-3xl font-bold text-primary">
          {currentTopic} GPT
        </h1>
      </div>
      <div className="flex h-full flex-1">
        <div className="chat-area flex flex-1 flex-col">
          <ScrollArea className="messages flex-1 overflow-auto">
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error</div>}
            {data?.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </ScrollArea>
          {addMessage.isLoading && (
            <div className="flex items-center">
              Ai is Thinking{" "}
              <span>
                <Loader2 className="ml-3 h-5 w-5 animate-spin" />
              </span>
            </div>
          )}
          {addMessage.isError && <div className="text-red-500">{error}</div>}
          <div className="flex-2 pb-10 pt-4">
            <div className="write flex rounded-lg bg-white shadow">
              <div className="w-11/12">
                <Textarea
                  name="message"
                  className="block w-full bg-transparent px-4 py-4 outline-none"
                  rows={1}
                  placeholder="Type a message..."
                  autoFocus
                  spellCheck
                  onChange={(e) => setMessage(e.target.value)}
                ></Textarea>
              </div>
              <div className="flex w-1/12 items-center justify-center bg-primary">
                <Button variant="link" onClick={handleSendMessage}>
                  <SendIcon size={24} className="text-white" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
