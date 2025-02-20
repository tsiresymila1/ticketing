import { Briefcase, ChartArea, HelpCircle, Home, KanbanSquareDashed, LucideIcon, Settings, Users2 } from "lucide-react"

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
                url: "#",
                icon: Users2,
            },

            {
                title: "Activity",
                url: "#",
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
    return (
        <Sidebar>
            <SidebarHeader className="py-4 ps-8">
                <KanbanSquareDashed size={20} />
            </SidebarHeader>
            <SidebarContent className="px-4">
                {items.map((item, index) => {
                    return <SidebarGroup key={`group-item-${index}`}>
                        <SidebarGroupLabel className="font-bold">Application</SidebarGroupLabel>
                        <SidebarGroupContent className="flex gap-4">
                            <SidebarMenu>
                                {item.children.map((menu, index2) => (
                                    <SidebarMenuItem key={`item-${index}-${index2}`} className="my-1">
                                        <SidebarMenuButton asChild className="py-2">
                                            <a href={`${item.url}${menu.url}`} className="flex gap-5">
                                                <menu.icon />
                                                <span>{menu.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                })}

            </SidebarContent>
        </Sidebar>
    )
}
