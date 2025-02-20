import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { AppChart } from "./components/app-chart";
import DashItem from "./components/dash-item";
import { RecentActivity } from "./components/recent-activity";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) return <p>Access Denied</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Welcome, {session.user?.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8 justify-center">
        <DashItem />
        <DashItem />
        <DashItem />
        <DashItem />
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
            <CardDescription>You  can view here recent activities </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
