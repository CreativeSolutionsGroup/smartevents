import { userIsAdmin } from "@/lib/user-info";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!(await userIsAdmin())) {
    return <div className="p-4">Unauthorized</div>;
  }

  return <>{children}</>;
}
