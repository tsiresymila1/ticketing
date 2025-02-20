import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "@/components/logout-button";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) return <p>Access Denied</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {session.user?.email}</h1>
      <LogoutButton />
    </div>
  );
}
