"use client";

import { RegisterInput, registerUser } from "@/actions/auth";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirm_password: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
});

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: RegisterInput) => {
        setLoading(true);
        const res = await registerUser(data);
        setLoading(false);

        if (res?.error) {
            setError(res.error);
            setSuccess(null);
        } else {
            setSuccess(res.success!);
            setError(null);
            router.push("/auth");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="w-96 space-y-4">
                <Card className="min-w-[400px] py-8">
                    <CardHeader>
                        <CardTitle>Register</CardTitle>
                        <CardDescription>Enter your credentials for login</CardDescription>
                    </CardHeader>
                    <CardContent className="w-auto flex flex-col gap-8">
                        {error && <FormError>{error}</FormError>}
                        {success && <FormSuccess>{success}</FormSuccess>}
                        <div className="flex flex-col gap-4">
                            <div>
                                <Input {...register("name")} autoComplete="off" placeholder="Name" />
                                {errors.name && <FormError>{errors.name.message}</FormError>}
                            </div>
                            <div>
                                <Input {...register("email")} autoComplete="off" type="email" placeholder="Email" />
                                {errors.email && <FormError>{errors.email.message}</FormError>}
                            </div>
                            <div>
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
                            <div>
                                <Input {...register("confirm_password")} autoComplete="off" type={showPassword ? "text" : "password"} placeholder="Confirm password" />
                                {errors.confirm_password && <FormError>{errors.confirm_password.message}</FormError>}
                            </div>
                        </div>
                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? "Registering..." : "Register"}
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
