import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  addTopics: protectedProcedure
    .input(
      z.object({
        topic: z.string().min(1).max(100),
        description: z.string().min(10).max(1000),
        fileIds: z.array(
          z.object({
            id: z.string().cuid(),
          })
        ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const topics = await ctx.prisma.topic.create({
        data: {
          name: input.topic,
          description: input.description,
          userId: ctx.session.user.id,
          documents: {
            createMany: {
              data: input.fileIds.map((fileId) => ({
                fileId: fileId.id,
                userId: ctx.session.user.id,
              })),
            },
          },
        },
      });
      return topics;
    }),
});
