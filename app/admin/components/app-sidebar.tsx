"use client"
import { Briefcase, ChartArea, HelpCircle, Home, KanbanSquareDashed, LucideIcon, Settings, Users2 } from "lucide-react"

import { Label } from "@/components/ui/label"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"


type SideMenuType = {
    title: string,
    url: string,
    children: {
        title: string,
        url: string,
        icon: LucideIcon,
    }[]

}
// Menu items.
const items: SideMenuType[] = [
    {
        title: "Application",
        url: '/admin',
        children: [
            {
                title: "Home",
                url: "",
                icon: Home,
            },
            {
                title: "Projects",
                url: "/project",
                icon: Briefcase,
            },
            {
                title: "Users",
                url: "/users",
                icon: Users2,
            },

            {
                title: "Activity",
                url: "/activity",
                icon: ChartArea,
            },
        ]
    },
    {
        title: "Settings",
        url: '/admin',
        children: [
            {
                title: "Settings",
                url: "#",
                icon: Settings,
            },
            {
                title: "Help",
                url: "#",
                icon: HelpCircle,
            }
        ]
    },
]

export function AppSidebar() {
    const pathname = usePathname()
    console.log("pathname::", pathname)
    return (
        <Sidebar>
            <SidebarHeader className="py-4 ps-8">
                <div className="flex flex-row items-center gap-4">
                    <KanbanSquareDashed size={20} />
                    <Label className="font-bold text-md">Ticket Inc</Label>
                </div>
            </SidebarHeader>
            <SidebarContent className="px-4 mt-4">
                {items.map((item, index) => {
                    return <SidebarGroup key={`group-item-${index}`}>
                        <SidebarGroupLabel className="font-bold">{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent className="flex gap-4">
                            <SidebarMenu>
                                {item.children.map((menu, index2) => {
                                    const url = `${item.url}${menu.url}`
                                    return (<SidebarMenuItem key={`item-${index}-${index2}`} className="my-1">
                                        <SidebarMenuButton isActive={pathname === url} asChild className="py-2">
                                            <a href={url} className="flex gap-5">
                                                <menu.icon />
                                                <span>{menu.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>)
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                })}

            </SidebarContent>
        </Sidebar>
    )
}
