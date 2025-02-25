"use client"
import { processProject, ProjectFormData } from "@/actions/project"
import FormError from "@/components/form-error"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import { PropsWithChildren, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"

const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().max(1000, "Description must be at most 1000 characters"),
});

export type ProcessProjectDialogProps = PropsWithChildren & {
    title?: React.ReactNode
    description?: React.ReactNode
    submit?: React.ReactNode,
    defaultValues?: ProjectFormData
}

export default function ProcessProjectDialog({ children, title, description, submit, defaultValues }: ProcessProjectDialogProps) {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ProjectFormData>({
        defaultValues: defaultValues,
        resolver: yupResolver(schema)
    })
    const router = useRouter()

    const onSubmit = async (data: ProjectFormData) => {
        const res = await processProject(data)
        if (res) {
            setOpen(false)
            if (!defaultValues) {
                reset()
            }
            router.refresh()
        }
    }
    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title ?? 'Create new project'}</DialogTitle>
                <DialogDescription>{description ?? 'Please, provide all info for creating new project'}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-4 gap-8 flex-col flex">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Title</Label>
                            <Input {...register("title")} placeholder="Title" />
                            {errors.title && <FormError>{errors.title.message}</FormError>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Description</Label>
                            <Textarea {...register("description")} placeholder="Description" />
                            {errors.description && <FormError>{errors.description.message}</FormError>}
                        </div>
                    </div>
                    <Button type="submit">
                        {submit ?? 'Save'}
                    </Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>



}