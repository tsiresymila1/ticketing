"use client";

import { registerUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        const res = await registerUser(formData);
        setLoading(false);

        if (res?.error) {
            setError(res.error);
            setSuccess(null);
        } else {
            setSuccess(res.success!);
            setError(null);
            router.push("/login");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <form action={handleSubmit} className="w-96 space-y-4">
                <Card className="min-w-[400px] py-8">
                    <CardHeader>
                        <CardTitle>Register</CardTitle>
                        <CardDescription>Enter your credentials for logins</CardDescription>
                    </CardHeader>
                    <CardContent className="w-auto flex flex-col gap-4">
                        <Input name="name" placeholder="Name" required />
                        <Input name="email" type="email" placeholder="Email" required />
                        <Input name="password" type="password" placeholder="Password" required />
                        {error && <p className="text-red-500">{error}</p>}
                        {success && <p className="text-green-500">{success}</p>}
                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? "Registering..." : "Register"}
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
