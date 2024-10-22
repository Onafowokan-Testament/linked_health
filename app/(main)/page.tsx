import PostEditor from "@/components/posts/editors/PostEditor";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full bg-red-50">
      <div className="w-full">
        <PostEditor />
      </div>
    </main>
  );
}
