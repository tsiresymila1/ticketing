import { getprojectById } from "@/actions/project";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Pencil } from "lucide-react";
import BackButton from "../../components/back-button";
import { BtnScrapping } from "../components/btn-scapping";
import ChatComponent from "../components/chat";
import DeleteProject from "../components/delete-project";
import ProcessProjectDialog from "../components/process-project";
import RequestStatsChart from "../components/request-chart";
import { ScrapeStatus } from "../components/status";

export default async function ProjectView({ params }: { params: { id: string } }) {
    const project = await getprojectById(params.id)
    return <div className="w-full px-8 gap-8">
        <div className="p-8 flex flex-row justify-between">
            <div className="flex flex-row items-start gap-4">
                <BackButton />
                <div className=" flex-1">
                    <h1 className="text-2xl font-bold">{project?.title}</h1>
                    <Label className="text-muted-foreground">{project?.description}</Label>
                </div>
            </div>
            <div className="flex flex-row items-start gap-4">
                <BtnScrapping token={project?.token ?? ''} />
                <ProcessProjectDialog
                    title="Edit project"
                    description="Please, provide all info to update the project"
                    defaultValues={{
                        id: project?.id,
                        title: project?.title ?? '',
                        url: project?.url ?? '',
                        isSpa: project?.isSpa ?? false,
                        description: project?.description ?? ''
                    }} >
                    <Button>
                        <Pencil />
                        <Label className="hidden sm:block">Edit</Label>
                    </Button>
                </ProcessProjectDialog>
                <DeleteProject projectId={params.id} />
            </div>
        </div>
        <div className="flex flex-col gap-0 px-8">
            <div className="flex gap-4 items-center py-2 px-4">
                <Label className="text-sm font-bold">Token: </Label>
                <div className="flex flex-row flex-1">
                    <div className="rounded-md bg-muted px-4 py-3 flex items-center relative">
                        <Label className="flex-1 me-8 select-text">{project?.token ?? 'token'}</Label>
                        <Button size="icon" variant="ghost" className="absolute end-1">
                            <Copy />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 items-center py-2 px-4">
                <Label className="text-sm font-bold">Status: </Label>
                <div className="flex flex-row flex-1">
                    <div className="rounded-md bg-muted px-4 py-3 flex items-center relative">
                        <ScrapeStatus token={project!.token!} />
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col p-8">
            <RequestStatsChart projectId={params.id} />
        </div>
        <ChatComponent token={project!.token!} />
    </div>
}