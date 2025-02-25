import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";


export type DaseItemProps = {
    title: React.ReactNode,
    count: React.ReactNode,
    text?: React.ReactNode
    url?: string
}

export default function DashItem({title, count, text, url}: DaseItemProps) {
    return <Card className="rounded-md px-6 py-4 flex-1 min-w-[300px] dark:bg-slate-900 bg-slate-50">
        <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-2">
                <Label className="text-md font-bold">{title}</Label>
                <div className="flex flex-col">
                    <Label className="text-3xl font-bold">{count}</Label>
                    <Label className="text-sm text-muted-foreground">{text}</Label>
                </div>
            </div>
            <div>
                <Button asChild variant="ghost" size="icon">
                    <Link href={url ?? '#'}> <ExternalLink /></Link>
                </Button>
            </div>
        </div>
    </Card>
}