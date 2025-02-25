import { listActivities } from "@/actions/activity"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { format } from "date-fns"

export async function RecentActivity({ limit }: { limit?: number }) {
    const activities = await listActivities(limit)
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {activities.map((act) => (
                    <TableRow key={act.id}>
                        <TableCell className="font-medium">
                            <Avatar>
                                <AvatarFallback>{act.user.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>
                            <div className="flex flex-col gap-2">
                                <Label className="font-bold">{act.user.name}</Label>
                                <Label className="text-xs">{act.user.email}</Label>
                            </div>
                        </TableCell>
                        <TableCell>{act.action}</TableCell>
                        <TableCell className="text-right">{format(act.createdAt, 'yyyy/MM/dd HH:ii:ss')}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
