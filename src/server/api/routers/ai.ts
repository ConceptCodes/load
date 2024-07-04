import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const aiRouter = createTRPCRouter({
  getChatLog: publicProcedure
    .input(
      z.object({
        topic: z.string().min(1).max(100),
      })
    )
    .query(async ({ input, ctx }) => {
      const messages = await ctx.prisma.chat
        .findFirst({
          where: {
            topicId: input.topic,
          },
        })
        .messages();

      if (!messages) {
        await ctx.prisma.chat.create({
          data: {
            topicId: input.topic,
          },
        });
        return [];
      }
      return messages;
    }),
  sendMessage: publicProcedure
    .input(
      z.object({
        topic: z.string().min(1).max(100),
        message: z.string().min(10),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const [chatlog, _] = await Promise.all([
        ctx.prisma.chat
          .findFirst({
            take: 10,
            where: {
              topicId: input.topic,
            },
          })
          .messages(),
        ctx.prisma.chat.update({
          where: {
            topicId: {
              topicId: input.topic,
            },
          },
          data: {
            messages: {
              create: {
                content: input.message,
              },
            },
          },
        }),
      ]);
      // const response = await callOpenAi(input.message, chatlog);
      await ctx.prisma.chat.update({
        where: {
          topicId: {
            topicId: input.topic,
          },
        },
        data: {
          messages: {
            create: {
              content: "SYSTEM",
              isChatbot: true,
            },
          },
        },
      });
    }),
});
