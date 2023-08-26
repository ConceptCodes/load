import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useToast } from "@/hooks/useToast";
import { Loader2Icon, MailIcon } from "lucide-react";

const LoginModal = () => {
  const { data: session } = useSession();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await signIn("email", { email, redirect: false });
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
  return (
    <Dialog
      open={openModal}
      onOpenChange={(isOpen) => {
        setOpenModal(isOpen);
      }}
    >
      <DialogTrigger asChild className="sticky bottom-0 m-3 text-xs">
        <Button onClick={() => setOpenModal(true)}>
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
  );
};

export default LoginModal;
