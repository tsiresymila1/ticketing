"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter()
    const goBack = () => {
        router.back()
    }
    return <Button onClick={goBack} variant="ghost" size="icon">
        <ArrowLeft />
    </Button>
}