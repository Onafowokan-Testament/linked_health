"use server";

import { validateRequest } from "@/app/auth";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/lib/type";
import { createPostSchema } from "@/lib/validation";

const submitPost = async (input: string) => {
  const { user } = await validateRequest();

  if (!user) throw Error("Unauthorized");
  const { content } = createPostSchema.parse({ content: input });

  const newPost = await prisma.post.create({
    data: {
      content,
      userId: user.id,
    },
    include: postDataInclude,
  });

  return newPost;
};

export default submitPost;
