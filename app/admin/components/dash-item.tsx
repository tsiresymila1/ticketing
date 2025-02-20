import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ExternalLink } from "lucide-react";

export default function DashItem() {
    return <Card className="rounded-md px-6 py-4 flex-1 min-w-[300px]">
        <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-2">
                <Label className="text-md font-bold">Project</Label>
                <div className="flex flex-col">
                    <Label className="text-3xl font-bold">3</Label>
                    <Label className="text-sm text-muted-foreground">You have cuurently 3 project</Label>
                </div>
            </div>
            <div>
                <Button variant="ghost" size="icon">
                    <ExternalLink />
                </Button>
            </div>
        </div>
    </Card>
}