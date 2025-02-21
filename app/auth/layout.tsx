import { ToggleThemeButton } from "@/components/toggle-theme";


export default function AuthLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="flex flex-col items-center justify-center max-h-screen h-screen overflow-hidden max-sm:dark:bg-slate-950 dark:bg-slate-900 bg-slate-50 ">
        <div className="flex justify-end px-8 py-3 w-full absolute top-0 ">
            <ToggleThemeButton />
        </div>
        <div className="flex flex-col items-center justify-center flex-1 w-full h-full">
            {children}
        </div>
    </div>

}