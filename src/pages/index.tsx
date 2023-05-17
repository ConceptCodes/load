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
    <div className="h-screen w-full">
      <div className="flex h-full">
        <Sidebar />
        <div className="h-full w-full flex-1 bg-gray-100">
          <div className="main-body container m-auto flex h-full w-11/12 flex-col pt-5">
            <div className="flex-2 flex flex-row py-4">
              <div className="flex-1">
                <span className="inline-block align-bottom text-gray-700 hover:text-gray-900 xl:hidden">
                  <span className="block h-6 w-6 rounded-full p-1 hover:bg-gray-400">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                  </span>
                </span>
                <span className="ml-8 inline-block align-bottom text-gray-700 hover:text-gray-900 lg:hidden">
                  <span className="block h-6 w-6 rounded-full p-1 hover:bg-gray-400">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </span>
                </span>
              </div>
              <div className="flex-1 text-right">
                <span className="inline-block text-gray-700">
                  Status:{" "}
                  <span className="inline-block h-4 w-4 rounded-full border-2 border-white bg-green-400 align-text-bottom"></span>{" "}
                  <b>Online</b>
                  <span className="inline-block align-text-bottom">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                    >
                      <path d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </span>
                </span>
              </div>
            </div>
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
}
