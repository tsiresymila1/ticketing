import { Label } from "@/components/ui/label";
import { RecentActivity } from "../components/recent-activity";
import { ListUsers } from "./components/list-users";

export default function PageUsers() {
    return <div className="w-full px-8 gap-8">
        <div className="p-8 flex flex-row justify-between">
            <div className=" flex-1">
                <h1 className="text-2xl font-bold">List of users</h1>
                <Label className="text-muted-foreground">You can see here the description of the project</Label>
            </div>
        </div>
        <div className="p-8">
            <ListUsers />
        </div>
    </div>
}