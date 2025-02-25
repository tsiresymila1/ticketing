import { getprojectById } from "@/actions/project";
import { Label } from "@/components/ui/label";
import BackButton from "../../components/back-button";
import DeleteProject from "../components/delete-project";

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
                <DeleteProject projectId={params.id} />
            </div>
        </div>
    </div>
}