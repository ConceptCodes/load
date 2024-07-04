/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Loader2, PlusCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/lib/api";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/useToast";
import { Button } from "../ui/button";
import { ToastAction } from "../ui/toast";

const AddTopicModal = () => {
  const { toast } = useToast();

  const formSchema = z.object({
    topic: z.string().min(1).describe("question"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
    },
  });

  const utils = api.useUtils();

  const addTopicMutation = api.user.addTopic.useMutation({
    onSuccess: () => {
      toast({
        title: "Topic added",
        description: "The topic has been added successfully",
      });
    },
    onSettled: async () => await utils.user.listTopics.invalidate(),
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await addTopicMutation.mutateAsync(values);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <PlusCircleIcon size={20} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Onboard a new Topic</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-2 flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={addTopicMutation.isPending}
                        type="text"
                        {...field}
                        placeholder="Enter a topic"
                        onChangeCapture={field.onChange}
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">
                {addTopicMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Add"
                )}
              </Button>
            </form>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default AddTopicModal;
