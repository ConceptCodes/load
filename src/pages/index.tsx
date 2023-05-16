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
    // <div classNameName="h-screen border lg:grid lg:grid-cols-3">
    //   <Sidebar />
    //   <Chat />
    // </div>
     <div className="w-full h-screen">
        <div className="flex h-full">
            <Sidebar />
            <div className="flex-1 bg-gray-100 w-full h-full">
                <div className="main-body container m-auto w-11/12 h-full flex flex-col pt-5">
                    {/* <div className="py-4 flex-2 flex flex-row">
                        <div className="flex-1">
                            <span className="xl:hidden inline-block text-gray-700 hover:text-gray-900 align-bottom">
                                <span className="block h-6 w-6 p-1 rounded-full hover:bg-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                </span>
                            </span>
                            <span className="lg:hidden inline-block ml-8 text-gray-700 hover:text-gray-900 align-bottom">
                                <span className="block h-6 w-6 p-1 rounded-full hover:bg-gray-400">
                                    <svg className="h-4 w-4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                </span>
                            </span>
                        </div>
                        <div className="flex-1 text-right">
                            <span className="inline-block text-gray-700">
                                Status: <span className="inline-block align-text-bottom w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span> <b>Online</b>
                                <span className="inline-block align-text-bottom">
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" className="w-4 h-4"><path d="M19 9l-7 7-7-7"></path></svg>
                                </span>
                            </span>
        
                            <span className="inline-block ml-8 text-gray-700 hover:text-gray-900 align-bottom">
                                <span className="block h-6 w-6 p-1 rounded-full hover:bg-gray-400">
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" className="w-4 h-4"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                                </span>
                            </span>
                        </div>
                    </div> */}
    
                    <Chat />
                </div>
            </div>
        </div>
    </div>
  );
}
