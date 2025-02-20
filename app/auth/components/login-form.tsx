"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginForm() {
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const res = await signIn("credentials", {
            redirect: false,
            email: formData.get("email"),
            password: formData.get("password"),
        });

        if (res?.error) setError("Invalid credentials");
        else window.location.href = "/dashboard";
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Card className="min-w-[400px] py-8">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Enter your credentials for logins</CardDescription>
                    </CardHeader>
                    <CardContent className="w-auto flex flex-col gap-4">
                        <Input name="email" type="email" required placeholder="Email" />
                        <Input name="password" type="password" required placeholder="Password" />
                        {error && <p className="text-red-500">{error}</p>}
                        <Button type="submit" >Login</Button>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
