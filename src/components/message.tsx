import type { FC } from "react";
import type { Message } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

interface IMessageProps {
  message: Message;
}

export const ChatMessage: FC<IMessageProps> = (props: IMessageProps) => {
  const { data: session } = useSession();
  return (
    <div
      className={cn("message mb-4 flex", {
        "me text-right": !props.message.isChatbot,
      })}
    >
      {props.message.isChatbot && (
        <div className="flex-2">
          <Avatar className="h-24 w-24 p-4">
            {!props.message.isChatbot && (
              <AvatarImage
                src={session?.user.image as string}
                alt={session?.user.email as string}
              />
            )}
            <AvatarFallback className="border-2 border-primary bg-primary/20 text-xl">
              🤖
            </AvatarFallback>
          </Avatar>
        </div>
      )}

      <div className="flex-1 px-2">
        <div
          className={cn(
            "inline-block rounded-md  p-2 px-6",
            props.message.isChatbot
              ? "bg-primary text-white"
              : "bg-gray-300 text-gray-700"
          )}
        >
          <span>{props.message.content}</span>
        </div>
        <div className="pl-4">
          <small className="text-gray-500">
            {new Date(props.message.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </small>
        </div>
      </div>
    </div>
  );
};
