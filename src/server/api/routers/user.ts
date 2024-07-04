import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  addTopic: publicProcedure
    .input(
      z.object({
        topic: z.string().min(1).max(100),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.topic.create({
        data: {
          name: input.topic,
        },
      });
    }),
  listTopics: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.topic.findMany();
  }),
});
