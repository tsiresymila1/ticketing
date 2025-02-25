import { Label } from "@/components/ui/label";
import { Bot } from "lucide-react";
import LoginForm from "../components/login-form";

export default function LoginPage() {
    return <div className="lg:w-[800px] max-lg:max-w-[400px]  flex dark:bg-slate-950 bg-slate-100 w-full rounded-md">

        <div className="flex-1 p-8 dark:bg-[rgb(16,25,45)] dark:bg-opacity-100 border border-l-0 bg-slate-200 flex flex-col justify-center items-center max-lg:hidden">
            <Bot size={80} />
            <Label className="font-bold text-xl">AI Bot Scapper</Label>
        </div>
        <div className="flex-1 lg:px-8 py-8 rounded-lg flex w-full ">
            <LoginForm />
        </div>
    </div>
}