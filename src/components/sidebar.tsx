import { useState, Fragment, useCallback } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Loader2Icon, MailIcon, BrainCogIcon } from "lucide-react";

import { ThemeToggle } from "./ui/theme-wrapper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";

import useStore from "@/store/useStore";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";
import Link from "next/link";

export function Sidebar() {
  const { data: session } = useSession();

  const { setCurrentTopic, currentTopic, topics } = useStore();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await signIn("email", { email, redirect: false })
      toast({
        title: "Success",
        description: `We've sent a magic link to ${email}. Check your inbox!`,
      });
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error as string,
      });
    } finally { 
      setIsLoading(false);
    }
  };

  const cleanEnumValue = (obj: string) => {
    return obj.replace(/_/g, " ").toLocaleLowerCase();
  };

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
        <div className="mt-2 text-sm font-semibold dark:text-white">
          {session?.user?.email ? session?.user?.email : ""}
        </div>
        <div className="py-2 text-xs text-gray-500">
          <ThemeToggle />
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold dark:text-white">Courses</span>
        </div>
        <div className="-mx-2 mt-4 max-h-200 flex flex-col items-start space-y-1 overflow-y-scroll ">
          {topics.map((topic) => (
            <Fragment key={topic}>
              <Button
                variant="link"
                className="flex w-full flex-row items-center justify-start rounded-xl p-2 capitalize hover:text-primary dark:hover:text-white"
                onClick={() => setCurrentTopic(topic)}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    currentTopic === topic
                      ? "bg-primary text-white dark:bg-white dark:text-black"
                      : "bg-gray-100 text-gray-500 dark:text-gray-500"
                  )}
                >
                  {topic[0]}
                </div>
                <div
                  className={cn(
                    "ml-2 text-sm font-semibold",
                    currentTopic === topic
                      ? "text-primary dark:text-white"
                      : "text-gray-500 dark:text-gray-500"
                  )}
                >
                  {cleanEnumValue(topic)}
                </div>
              </Button>
              <Separator />
            </Fragment>
          ))}
        </div>
          <Dialog
            open={openModal}
            onOpenChange={(isOpen) => {
              setOpenModal(isOpen);
            }}
          >
            <DialogTrigger asChild className="m-3 text-xs sticky bottom-0">
              <Button
                onClick={() => setOpenModal(true)}
              >
                {session?.user ? "Logout" : "Login"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {session?.user ? "Are you sure you want to Logout" : "Login"}
                </DialogTitle>
                <DialogDescription>
                  {session?.user
                    ? "Are you sure you want to logout?"
                    : "We'll send you a magic link so you can login"}
                </DialogDescription>
              </DialogHeader>
              {session?.user ? (
                <Button
                  type="submit"
                  className="w-full"
                  variant="default"
                  onClick={() => void signOut()}
                >
                  Logout
                </Button>
              ) : (
                <form onSubmit={() => void handleLogin()}>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="mt-4 flex items-center justify-between">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading || !email || !!error}
                      variant="default"
                    >
                      {isLoading ? (
                        <Loader2Icon className="animate-spin" />
                      ) : (
                        <MailIcon className="mr-3" />
                      )}
                      Login
                    </Button>
                  </div>
                </form>
              )}
            </DialogContent>
          </Dialog>
      </div>
    </div>
  );
}
