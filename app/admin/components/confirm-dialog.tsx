"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { PropsWithChildren, useState } from "react"

type ConfirmDialogProps = {
    onConfirm?: () => void,
    children?: PropsWithChildren['children'],
    title?: React.ReactNode,
    message?: React.ReactNode
}

export default function ConfirmDialog({ title, message, children, onConfirm }: ConfirmDialogProps) {
    const [open, setOpen] = useState(false);

    const onConfirmClicked = () => {
        setOpen(false)
        onConfirm?.()
    }



    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title ?? 'Confirmation'}</DialogTitle>
                <DialogDescription>{message ?? 'Are you sur to perform this action ?'}</DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end items-center gap-4">
                <Button onClick={() => setOpen(false)} variant="destructive">
                    <Label className="">Cancel</Label>
                </Button>
                <Button onClick={onConfirmClicked} >
                    <Label className="">Confirm</Label>
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>



}