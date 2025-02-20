import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLink, Plus } from "lucide-react";
import Link from "next/link";
import AddProjectDialog from "./components/add-project";

export default function Project() {
    return <div className="w-full px-8 gap-8">
        <div className="p-8 flex flex-row justify-between">
            <div className=" flex-1">
                <h1 className="text-2xl font-bold">Projects</h1>
                <Label className="text-muted-foreground">You can find here your list of project</Label>
            </div>
            <div className="flex flex-row">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus />
                            <Label>Add project</Label>
                        </Button>
                    </DialogTrigger>
                    <AddProjectDialog />
                </Dialog>
            </div>
        </div>
        <div className="px-8 gap-4">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 flex-shrink self-start">
                    <Badge variant="outline">All</Badge>
                    <Badge variant="outline">OrderBy</Badge>
                    <Badge variant="outline">Terminé</Badge>
                </div>
                <div className="py-2">
                    <Input placeholder="Search ..." className="w-60" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
                {Array.from(Array(20).keys()).map((e) => (
                    <Link href={`/admin/project/${e}`} key={`project-item-${e}`}>
                        <Card className="rounded-md cursor-pointer hover:bg-accent ">
                            <CardHeader>
                                <CardTitle>Test projet {e}</CardTitle>
                                <CardDescription>This is a test of project...</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between">
                                    <div>
                                        <Label className="text-xl">12 </Label>
                                        <Label>users iieisisf sfsi</Label>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <ExternalLink />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

        </div>
    </div>
}