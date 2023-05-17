import { useState } from "react";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Loader2Icon, MailIcon } from "lucide-react";
import { Topics } from "@prisma/client";

import { useSession, signIn, signOut } from "next-auth/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import useStore from "@/store/useStore";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { data: session } = useSession();

  const { setCurrentTopic } = useStore();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await signIn("email", { email });
      setEmailSent(true);
      setIsLoading(false);
    } catch (error) {
      setError("Something went wrong");
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      session?.user ? await signOut() : setOpenModal(true);
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="sm:flex-2 hidden w-64 bg-gray-200 xl:block">
      <Avatar className="h-32 w-32 p-4">
        <AvatarImage
          src={session?.user.image as string}
          alt={session?.user.email as string}
        />
        <AvatarFallback className="border-2 border-primary bg-primary/20 text-4xl">
          🧠
        </AvatarFallback>
      </Avatar>

      <div className="menu mt-8">
        {Object.keys(Topics).map((topic) => (
          <>
            <Button
              key={topic}
              variant="ghost"
              className="m-3 w-full text-left"
              onClick={() => setCurrentTopic(topic as Topics)}
            >
              {topic}
            </Button>
            <Separator />
          </>
        ))}
        <Dialog open={openModal}>
          <DialogTrigger asChild>
            <Button className="m-3 text-xs" onClick={handleSubmit}>
              {session?.user ? `Logout ${session?.user?.email}` : "Login"}
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
                onClick={handleSubmit}
              >
                Logout
              </Button>
            ) : (
              <form onSubmit={handleLogin}>
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
                    disabled={isLoading}
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
