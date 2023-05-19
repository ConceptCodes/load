import { useState, Fragment } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Topics } from "@prisma/client";
import { Loader2Icon, MailIcon, BrainCogIcon } from "lucide-react";

import { ThemeToggle } from "@/components/ui/theme-wrapper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";

import useStore from "@/store/useStore";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";

export function Sidebar() {
  const { data: session } = useSession();

  const { setCurrentTopic, currentTopic } = useStore();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await signIn("email", { email });
      toast({
        title: "Success",
        description: `We've sent a magic link to ${email}. Check your inbox!`,
      });
      setIsLoading(false);
    } catch (error) {
      setError("Something went wrong");
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
        <Avatar className="h-32 w-32 p-4">
          <AvatarFallback className="border-2 border-primary bg-primary/20 text-4xl">
            📚
          </AvatarFallback>
        </Avatar>
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
        <div className="-mx-2 mt-4 flex h-72 flex-col space-y-1 overflow-y-auto">
          {Object.keys(Topics).map((topic) => (
            <Fragment key={topic}>
              <Button
                variant="ghost"
                className="flex flex-row items-center rounded-xl p-2 capitalize hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => setCurrentTopic(topic as Topics)}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    currentTopic === topic
                      ? "bg-primary text-white dark:bg-white dark:text-black"
                      : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500"
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
                <div className="ml-auto flex h-4 w-4 items-center justify-center leading-none text-white"></div>
              </Button>
              <Separator />
            </Fragment>
          ))}
        </div>
        <div className="-mx-2 flex flex-col space-y-1 pt-4">
          <Dialog
            open={openModal}
            onOpenChange={(isOpen) => {
              setOpenModal(isOpen);
            }}
          >
            <DialogTrigger asChild>
              <Button
                className="m-3 text-xs"
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
    </div>
  );
}
