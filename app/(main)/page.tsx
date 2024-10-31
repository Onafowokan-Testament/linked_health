import Posts from "@/components/Posts";
import PostEditor from "@/components/posts/editors/PostEditor";
import TrendsSidebar from "@/components/TrendsSidebar";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/lib/type";
import Image from "next/image";
import ForYouFeed from "./ForYouFeed";

export default async function Home() {
  return (
    <main className="w-full min-w-0 flex gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <ForYouFeed />
      </div>
      <div>
        <TrendsSidebar />
      </div>
    </main>
  );
}
