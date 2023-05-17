import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { Topics } from "@prisma/client";
import { callOpenAi } from "@/utils";

export const aiRouter = createTRPCRouter({
  getChatLog: protectedProcedure
    .input(
      z.object({
        topic: z.nativeEnum(Topics),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const messages = await ctx.prisma.chat
          .findFirst({
            where: {
              topic: input.topic,
              userId: ctx.session.user.id,
            },
          })
          .messages();

        if (!messages) {
          await ctx.prisma.chat.create({
            data: {
              topic: input.topic,
              userId: ctx.session.user.id,
            },
          });
          return [];
        }
        return messages;
      } catch (e) {
        console.log(e);
        return [];
      }
    }),
  sendMessage: protectedProcedure
    .input(
      z.object({
        topic: z.nativeEnum(Topics),
        message: z.string().min(10),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const [chatlog, _] = await Promise.all([
          ctx.prisma.chat
            .findFirst({
              take: 10,
              where: {
                topic: input.topic,
                userId: ctx.session.user.id,
              },
            })
            .messages(),
          ctx.prisma.chat.update({
            where: {
              userId_topic: {
                topic: input.topic,
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
        const response = await callOpenAi(input.message, chatlog);
        await ctx.prisma.chat.update({
          where: {
            userId_topic: {
              topic: input.topic,
              userId: ctx.session.user.id,
            },
          },
          data: {
            messages: {
              create: {
                content: response,
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
        return { success: true };
      } catch (e) {
        console.log(e);
        return { success: false };
      }
    }),
});
