"use server";

import { validateRequest } from "@/app/auth";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/lib/type";

export async function deletePost(id: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error(`Unauthorized1`);

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) throw new Error("Post not found");

  if (post.userId !== user.id) throw new Error("Unauthorized");

  const deletedPost = await prisma.post.delete({
    where: { id },
    include: postDataInclude,
  });

  return deletedPost;
}
