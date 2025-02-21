import { ToggleThemeButton } from "@/components/toggle-theme";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./components/login-form";
import RegisterForm from "./components/register-form";

export default function AuthPage() {
    return (
        <div className="flex flex-col items-center justify-center max-h-screen h-screen overflow-hidden dark:bg-slate-800 bg-slate-50 ">
            <div className="flex justify-end px-8 py-3 w-full">
                <ToggleThemeButton />
            </div>
            <div className="flex flex-col items-center justify-center flex-1 ">
                <Tabs defaultValue="login" className="w-[400px] dark:bg-slate-950 p-8 rounded-lg">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <LoginForm />
                    </TabsContent>
                    <TabsContent value="register">
                        <RegisterForm />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
