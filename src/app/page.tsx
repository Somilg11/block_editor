"use client";
import TextareaAutoSize from "react-textarea-autosize";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import Cover from "@/components/Cover";

export default function Home() {
  const [coverUrl, setCoverUrl] = useState<string>();

  // Function to fetch random image from Unsplash
  const enableCover = async () => {
    try {
      const randomImage = await fetch("https://images.unsplash.com/photo-1725961476494-efa87ae3106a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
      setCoverUrl(randomImage.url);
    } catch (error) {
      console.error("Error fetching image from Unsplash:", error);
    }
  };

  // Dynamically load the editor
  const Editor = useMemo(() => dynamic(() => import("@/components/Editor"), { ssr: false }), []);

  return (
    <main className="min-h-screen">
      <Cover url={coverUrl} setUrl={setCoverUrl} />
      <div className="flex flex-col md:px-20 px-0 py-10 w-full">
        <div className="group flex flex-col gap-2">
          {!coverUrl && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="hover:bg-neutral-100 text-neutral-400 rounded-md px-3 py-1 transition-colors"
                onClick={enableCover}
              >
                📔 Add cover
              </button>
            </div>
          )}
          <TextareaAutoSize
            placeholder="Untitled"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl px-12 font-bold focus:outline-none"
          />
        </div>
        <Editor onChange={() => {}} />
      </div>
    </main>
  );
}
