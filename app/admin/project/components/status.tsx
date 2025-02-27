"use client"
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api/client";
import { useSocket } from "@/lib/socket";
import { useEffect, useState } from "react";

type StatusProps = {
    token: string
}
export function ScrapeStatus({ token }: StatusProps) {
    const [status, setStatus] = useState<string>("none")
    const socket = useSocket();
    useEffect(() => {
        api.GET("/scape/{token}/status", {
            params: {
                path: {
                    token
                }
            }
        }).then((res) => {
            if (res.data?.status) {
                setStatus(res.data?.status)
            }

        })
        if (!socket) return;
        socket.on(`${token}:status`, (data: string) => {
            console.log("Status:::", data)
            setStatus(data)
        });
        return () => {
            socket.off(`${token}:status`);
        };
    }, [socket, token]);
    return <Label className="capitalize">{status} ...</Label>
}