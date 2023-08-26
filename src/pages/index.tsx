import type { Metadata } from "next";
import * as React from "react";

import { Sidebar } from "@/components/sidebar";

import Chat from "@/components/chat";

export const metadata: Metadata = {
  title: "Load",
  description: "ai chat app",
};

export default function Home() {
  return (
    <div className="flex h-screen text-gray-800 antialiased">
      <div className="flex h-full w-full flex-row overflow-x-hidden">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}
