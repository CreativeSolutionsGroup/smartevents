import { userIsAdmin } from "@/lib/user-info";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!(await userIsAdmin())) {
    redirect("/");
  }

  return <>{children}</>;
}
