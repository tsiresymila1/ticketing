"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import ProcessProjectDialog from "./process-project"



export default function AddProjectDialog() {
    return <ProcessProjectDialog >
        <Button>
            <Plus />
            <Label className="hidden sm:block">Add project</Label>
        </Button>
    </ProcessProjectDialog>
}