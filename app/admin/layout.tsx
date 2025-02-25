import { Metadata } from "next";

import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import AppBar from "./components/appbar";

export const metadata: Metadata = {
    title: "AI Bot Scapper",
    description: "Turn any website to LLM-ready data",
};

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full flex flex-col gap-4 relative h-screen overflow-hidden">
                <AppBar />
                <ScrollArea className="w-full flex flex-col relative ">
                    {children}
                </ScrollArea>
            </main>
        </SidebarProvider>
    );
}
