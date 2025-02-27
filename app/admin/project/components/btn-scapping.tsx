"use client"
import { startScapping } from "@/actions/bot";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

type Props = {
    token: string
}
export function BtnScrapping({ token }: Props) {

    const start = async () => {
        await startScapping(token)
    }
    return <Button onClick={start}>
        <Send />
        <Label className="hidden sm:block">Scrapping</Label>
    </Button>
}