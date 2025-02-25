"use client"
import { deleteProject } from "@/actions/project";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import ConfirmDialog from "../../components/confirm-dialog";

export default function DeleteProject({ projectId }: { projectId: string }) {
    const router = useRouter()
    const performDelete = async () => {
        const deleted = await deleteProject(projectId)
        if (deleted) router.back()
    }
    return <ConfirmDialog onConfirm={performDelete}>
        <Button variant="destructive">
            <Trash2 />
            <Label>Delete</Label>
        </Button>
    </ConfirmDialog>
}