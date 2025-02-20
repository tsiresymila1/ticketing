import { Label } from "@/components/ui/label";

export default function ProjectView() {
    return <div className="w-full px-8 gap-8">
        <div className="p-8 flex flex-row justify-between">
            <div className=" flex-1">
                <h1 className="text-2xl font-bold">Title of project</h1>
                <Label className="text-muted-foreground">You can see here the description of the project</Label>
            </div>
        </div>
    </div>
}