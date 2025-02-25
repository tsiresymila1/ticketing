import { Label } from "@/components/ui/label";
import { Bot } from "lucide-react";
import RegisterForm from "../components/register-form";

export default function RegisterPage() {
    return <div className="w-screen h-full flex flex-row">
        <div className="flex-1 dark:bg-slate-900 bg-slate-200 flex flex-col items-center justify-center max-lg:hidden">
            <div className="p-4 flex items-center gap-3 justify-center">
                <Bot size={60} />
                <Label className="font-bold text-xl">AI Bot Scapper</Label>
            </div>
            <div className="max-w-96 justify-center flex p-8 text-center">
                <Label className="text-sm">This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before.</Label>
            </div>
        </div>
        <div className="flex-1 flex justify-center items-center dark:bg-slate-950 bg-slate-100">
            <RegisterForm />
        </div>
    </div>
}