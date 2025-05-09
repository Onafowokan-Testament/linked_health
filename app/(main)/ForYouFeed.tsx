"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import Posts from "@/components/Posts";
import DeletePostDialog from "@/components/posts/DeletePostDialog";
import PostsLoadingSkeleton from "@/components/posts/PostLoadingSkeleton";
import { Button } from "@/components/ui/button";
import kyInstance from "@/lib/ky";
import { PostData, PostsPage } from "@/lib/type";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";

export default function ForYouFeed() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "for-you"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/posts/for-you",
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];
  if (status === "pending") {
    return <PostsLoadingSkeleton />;
  }
  if (status === "success" && !posts.length && !hasNextPage) {
    return <p>No one has posted anything yet</p>;
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occured while loading posts
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onButtonReached={() => hasNextPage && isFetching && fetchNextPage()}
    >
      {posts.map((post) => (
        <Posts key={post.id} post={post} />
      ))}

      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}
