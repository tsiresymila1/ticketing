import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function AddProjectDialog() {
    return <DialogContent>
        <DialogHeader>
            <DialogTitle>Create new project</DialogTitle>
            <DialogDescription>Please, provide all info for creating new project</DialogDescription>
        </DialogHeader>
        <div className="p-4 gap-8 flex-col flex">
            <div className="flex flex-col gap-4">
                <div>
                    <Input placeholder="Title" />
                </div>
                <div>
                    <Textarea placeholder="Description" />
                </div>
            </div>
            <Button>
                Create
            </Button>
        </div>
    </DialogContent>

}