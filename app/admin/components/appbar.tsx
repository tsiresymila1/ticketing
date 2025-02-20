import { ToggleThemeButton } from "@/components/toggle-theme";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ProfileButton } from "./profile-button";

export default function AppBar() {
    return <div className="w-full px-4 py-3 flex justify-between border-b">
        <div className="">
            <SidebarTrigger />
        </div>
        <div className="flex items-center gap-2">
            <ToggleThemeButton />
            <ProfileButton />
        </div>
    </div>
}