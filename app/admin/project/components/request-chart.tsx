"use client";

import { getRequestByProject } from "@/actions/request";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


type RequestStatsChartProps = {
    projectId: string
}
export default function RequestStatsChart({ projectId }: RequestStatsChartProps) {
    const [data, setData] = useState<Awaited<ReturnType<typeof getRequestByProject>>>([])
    const [day, setDay] = useState<number>(7)
    const { theme } = useTheme();

    useEffect(() => {
        getRequestByProject(projectId, day).then((res) => {
            setData(res)
        })
    }, [projectId, day])

    return (
        <Card className="w-full p-4 shadow-md rounded-sm">
            <CardHeader className="flex gap-4 justify-between">
                <div className="flex flex-row justify-between">
                    <div>
                        <CardTitle className="text-xl font-bold">Requests</CardTitle>
                        <CardDescription>Statistics for the requests</CardDescription>
                    </div>
                    <div>
                        <Select value={day.toString()} onValueChange={(v) => {
                            setDay(parseInt(v))
                        }}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Days" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="7">7 days</SelectItem>
                                    <SelectItem value="30">30 days</SelectItem>
                                    <SelectItem value="90">3 mounts</SelectItem>
                                    <SelectItem value="180">6 months</SelectItem>
                                    <SelectItem value="265">1 years</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4" >
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <XAxis tickFormatter={(date, index) => {
                            if (day === 365) return index % 30 === 0 ? date : "";
                            if (day === 180) return index % 15 === 0 ? date : "";
                            if (day === 90) return index % 10 === 0 ? date : "";
                            if (day === 30) return index % 5 === 0 ? date : "";
                            return date;
                        }} dataKey="date" className="text-sm" />
                        <YAxis className="text-sm" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: theme === "dark" ? "#1E1E2E" : "#FFFFFF",
                                borderRadius: "8px",
                                border: "none",
                                padding: "8px",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                            }}
                            labelStyle={{
                                fontWeight: "bold",
                                color: theme === "dark" ? "#FFFFFF" : "#000000",
                            }}
                        />
                        <Line type="monotone" dataKey="requests" stroke="#4F46E5" strokeWidth={1} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
