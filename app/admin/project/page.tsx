import { listProject } from "@/actions/project";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import AddProjectDialog from "./components/add-project";

export default async function Project() {
    const projects = await listProject()
    return <div className="w-full px-8 gap-8">
        <div className="sm:px-8 py-8 flex flex-row justify-between">
            <div className=" flex-1">
                <h1 className="text-2xl font-bold">Projects</h1>
                <Label className="text-muted-foreground">You can find here your list of project</Label>
            </div>
            <div className="flex flex-row">
                <AddProjectDialog />
            </div>
        </div>
        <div className="sm:px-8 gap-4">
            <div className="flex justify-between flex-wrap items-center gap-4">
                <div className="flex gap-2 flex-shrink self-start">
                    <Toggle variant="outline">All</Toggle>
                    <Toggle variant="outline">OrderBy</Toggle>
                    <Toggle variant="outline">Terminé</Toggle>
                </div>
                <div className="py-2">
                    <Input placeholder="Search ..." className="w-60" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
                {projects.map((project, e) => (
                    <Link href={`/admin/project/${project.id}`} key={`project-item-${project.id}`}>
                        <Card className="rounded-md cursor-pointer hover:bg-accent dark:bg-slate-900 bg-slate-50 ">
                            <CardHeader>
                                <CardTitle>{project.title}</CardTitle>
                                <CardDescription>{project.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between">
                                <Button variant="ghost" size="icon">
                                        <ExternalLink />
                                    </Button>
                                    <div className="relative flex items-center">
                                        {[project.user, ...project.collaborators].map((user, index) => (
                                            <div
                                                key={index}
                                                className={`w-7 h-7 rounded-full bottom-1 overflow-hidden ${index !== 0 ? "-ml-4" : ""}`}
                                                style={{ zIndex: ([project.user, ...project.collaborators]).length - index }} // Ensures correct stacking order
                                            >
                                                <Avatar className="w-7 h-7">
                                                    <AvatarImage src={user.image ?? ''} alt={user.name ?? ''} />
                                                    <AvatarFallback className="text-xs">{user.name?.toUpperCase().slice(0,2)}</AvatarFallback>
                                                </Avatar>
                                            </div>
                                        ))}
                                    </div>
                                    
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    </div>
}