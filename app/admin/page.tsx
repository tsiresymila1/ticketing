import getStats from "@/actions/stat";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { AppChart } from "./components/app-chart";
import DashItem from "./components/dash-item";
import { RecentActivity } from "./components/recent-activity";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const stat = await getStats()

  if (!session) return <p>Access Denied</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Welcome, {session.user?.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 lg:grid-cols-3 gap-6 pt-8 justify-center">
        <DashItem title="Porject" count={stat.project} text={`You have currently ${stat.project} projects`} url="/admin/project" />
        <DashItem title="Users" count={stat.user} text={`There are  currently ${stat.project} users on your team`} url="/admin/users" />
        <DashItem title="Activity" count={stat.activities.length} text={'This is not yet officla'} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 py-12 gap-12">
        <Card className="p-3 ">
          <CardHeader>
            <CardTitle>
              Overview
            </CardTitle>
            <CardDescription>You  can view here recent activities </CardDescription>
          </CardHeader>
          <CardContent>
            <AppChart />
          </CardContent>
        </Card>
        <Card className="p-3">
          <CardHeader>
            <CardTitle>
              Recents activties
            </CardTitle>
            <CardDescription>You can view here your recents activities </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity limit={5} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
