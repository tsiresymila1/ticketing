"use client";

import FormError from "@/components/form-error";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: { email: string; password: string }) => {
        const res = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
        });

        if (res?.error) setError("Invalid credentials");
        else router.replace("/admin");
    };

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="space-y-4 w-full">
                <div className="py-4 w-full">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Welcome back</CardTitle>
                        <CardDescription>Login to your AI Bot Scapper account</CardDescription>
                    </CardHeader>
                    <CardContent className="w-auto flex flex-col gap-8">
                        {error && <FormError>{error}</FormError>}
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <Label>Email</Label>
                                <Input {...register("email")} autoComplete="off" type="email" placeholder="Email" />
                                {errors.email && <FormError>{errors.email.message}</FormError>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Password</Label>
                                <div className="relative w-full">
                                    <Input {...register("password")} autoComplete="off" type={showPassword ? "text" : "password"} placeholder="Password" />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </Button>
                                </div>
                                {errors.password && <FormError>{errors.password.message}</FormError>}
                            </div>
                        </div>
                        <Button type="submit">Login</Button>
                        <div className="flex gap-4 justify-center items-center">
                            <Separator className="flex-1" />
                            <Label>OR</Label>
                            <Separator className="flex-1" />
                        </div>
                        <div className="flex justify-center items-center gap-1">
                            <Label>Don&apos;t have an account? </Label>
                            <Link className="underline cursor-pointer" href="/auth/register">
                                <Label className="cursor-pointer">Sign up</Label>
                            </Link>
                        </div>
                    </CardContent>
                </div>
            </form>
        </div>
    );
}
