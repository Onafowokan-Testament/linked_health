"use server";

import { validateRequest } from "@/app/auth";
import prisma from "@/lib/prisma";
import { createPostSchema } from "@/lib/validation";

const submitPost = async (input: string) => {
  const { user } = await validateRequest();

  if (!user) throw Error("Unauthorized");
  const { content } = createPostSchema.parse({ content: input });

  await prisma.post.create({
    data: {
      content,
      userId: user.id,
    },
  });
};

export default submitPost;
