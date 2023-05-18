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
    // <div
    //   className={cn("message mb-4 flex", {
    //     "me text-right": !props.message.isChatbot,
    //   })}
    // >
    //   )}
    //   <div className="flex-1 px-2">
    //     <div
    //       className={cn(
    //         "inline-block rounded-md  p-2 px-6",
    //         props.message.isChatbot
    //           ? "bg-primary text-white"
    //           : "bg-gray-300 text-gray-700"
    //       )}
    //     >
    //       <span>{props.message.content}</span>
    //     </div>
    //     <div className="pl-4">
    //       <small className="text-gray-500">
    //         {new Date(props.message.createdAt).toLocaleDateString("en-US", {
    //           month: "short",
    //           day: "numeric",
    //         })}
    //       </small>
    //     </div>
    //   </div>
    // </div>
    <div
      className={cn(
        "rounded-lg p-3",
        props.message.isChatbot
          ? "col-start-1 col-end-8"
          : "col-start-6 col-end-13"
      )}
    >
      <div
        className={cn(
          "flex items-center",
          props.message.isChatbot
            ? "flex-row"
            : "flex-row-reverse justify-start"
        )}
      >
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
          <div className="flex-2">
            <Avatar className="">
              <AvatarFallback className="border-2 border-primary bg-primary/20 text-xl">
                {props.message.isChatbot
                  ? "🧠"
                  : session?.user.email?.substring(0, 1)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div
          className={cn(
            "relative mx-3 rounded-xl px-4 py-2 text-sm shadow",
            props.message.isChatbot ? "bg-slate-700 text-white" : "bg-white"
          )}
        >
          <div>{props.message.content}</div>
        </div>
      </div>
    </div>
  );
};

export const AudioMessage: FC<IMessageProps> = (props: IMessageProps) => {
  return (
    <div className="col-start-1 col-end-8 rounded-lg p-3">
      <div className="flex flex-row items-center">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-500">
          A
        </div>
        <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
          <div className="flex flex-row items-center">
            <button className="flex h-8 w-10 items-center justify-center rounded-full bg-slate-600 hover:bg-slate-800">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </button>
            <div className="ml-4 flex flex-row items-center space-x-px">
              <div className="h-2 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-2 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-4 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-8 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-8 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-10 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-10 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-12 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-10 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-6 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-5 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-4 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-3 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-2 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-2 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-2 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-10 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-2 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-10 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-8 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-8 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-1 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-1 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-2 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-8 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-8 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-2 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-2 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-2 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-2 w-1 rounded-lg bg-gray-500"></div>
              <div className="h-4 w-1 rounded-lg bg-gray-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
