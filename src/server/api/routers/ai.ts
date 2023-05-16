import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { Topics } from "@prisma/client";

export const aiRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input, ctx }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getChatLog: protectedProcedure
    .input(
      z.object({
        topic: z.nativeEnum(Topics),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.chat
        .findFirstOrThrow({
          where: {
            topic: input.topic,
            userId: ctx.session.user.id,
          },
        })
        .messages();
    }),
});
