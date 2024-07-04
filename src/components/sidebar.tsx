/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Fragment } from "react";
import { BrainCogIcon } from "lucide-react";
import Link from "next/link";

import { ThemeToggle } from "./ui/theme-wrapper";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

import useStore from "@/store/useStore";
import { cn } from "@/lib/utils";
import AddTopicModal from "./modals/AddTopic";
import LanguageModal from "./modals/LanguageModal";
import { api } from "@/lib/api";

export function Sidebar() {
  const { setCurrentTopic, currentTopic } = useStore();

  const cleanEnumValue = (obj: string) => {
    return obj.replace(/_/g, " ").toLocaleLowerCase();
  };

  const { data, isFetched } = api.user.listTopics.useQuery();

  return (
    <div className="flex w-64 flex-shrink-0 flex-col bg-background py-8 pl-6 pr-2">
      <div className="flex h-12 w-full flex-row items-center justify-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-white">
          <BrainCogIcon size={20} />
        </div>
        <div className="ml-2 text-2xl font-bold dark:text-white">Load.ai</div>
      </div>
      <div className="mt-4 flex w-full flex-col items-center rounded-lg border border-gray-200 bg-slate-100 px-4 py-6 dark:border-none dark:bg-slate-900">
        <Link href="/profile">
          <Avatar className="h-32 w-32 p-4">
            <AvatarFallback className="border-2 border-primary bg-primary/20 text-4xl">
              📚
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="mt-2 text-sm font-semibold dark:text-white"></div>
        <section className="mt-4 flex items-center justify-center space-y-2">
          <div className="py-2 text-xs text-gray-500">
            <ThemeToggle />
          </div>
          <LanguageModal />
        </section>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold dark:text-white">Topics</span>
          <AddTopicModal />
        </div>
        <div className="max-h-200 -mx-2 mt-4 flex flex-col items-start space-y-1 overflow-y-scroll ">
          {isFetched &&
            Array.isArray(data) &&
            data.map((topic) => (
              <Fragment key={topic.name}>
                <Button
                  variant="link"
                  className="flex w-full flex-row items-center justify-start rounded-xl p-2 capitalize hover:text-primary dark:hover:text-white"
                  onClick={() => setCurrentTopic(topic.name)}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full",
                      currentTopic === topic.name
                        ? "bg-primary text-white dark:bg-white dark:text-black"
                        : "bg-gray-100 text-gray-500 dark:text-gray-500"
                    )}
                  >
                    {topic[0]?.name}
                  </div>
                  <div
                    className={cn(
                      "ml-2 text-sm font-semibold",
                      currentTopic === topic.name
                        ? "text-primary dark:text-white"
                        : "text-gray-500 dark:text-gray-500"
                    )}
                  >
                    {cleanEnumValue(topic.name)}
                  </div>
                </Button>
                <Separator />
              </Fragment>
            ))}
        </div>
      </div>
    </div>
  );
}
