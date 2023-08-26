import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const aiRouter = createTRPCRouter({
  getChatLog: protectedProcedure
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
            userId: ctx.session.user.id,
          },
        })
        .messages();

      if (!messages) {
        await ctx.prisma.chat.create({
          data: {
            topicId: input.topic,
            userId: ctx.session.user.id,
          },
        });
        return [];
      }
      return messages;
    }),
  sendMessage: protectedProcedure
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
              userId: ctx.session.user.id,
            },
          })
          .messages(),
        ctx.prisma.chat.update({
          where: {
            userId_topicId: {
              topicId: input.topic,
              userId: ctx.session.user.id,
            },
          },
          data: {
            messages: {
              create: {
                content: input.message,
                userId: ctx.session.user.id,
              },
            },
            user: {
              connect: {
                id: ctx.session.user.id,
              },
            },
          },
        }),
      ]);
      // const response = await callOpenAi(input.message, chatlog);
      await ctx.prisma.chat.update({
        where: {
          userId_topicId: {
            topicId: input.topic,
            userId: ctx.session.user.id,
          },
        },
        data: {
          messages: {
            create: {
              content: "SYSTEM GENERATED RESPONSE",
              userId: ctx.session.user.id,
              isChatbot: true,
            },
          },
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
});
