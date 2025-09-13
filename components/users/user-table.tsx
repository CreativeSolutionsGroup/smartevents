"use client";

import { UserWithAuthorizedUser } from "@/types/user";
import { useMemo, useState } from "react";
import { RolePicker } from "./role-picker";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

export default function UserTable({
  users,
}: {
  users: UserWithAuthorizedUser[];
}) {
  const [query, setQuery] = useState("");

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.email.toLowerCase().includes(query.toLowerCase()) ||
          user.name?.toLowerCase().includes(query.toLowerCase()) ||
          (user.authorizedUser?.role.toLowerCase() ?? "viewer").includes(
            query.toLowerCase()
          )
      ),
    [users, query]
  );

  return (
    <div className="overflow-auto max-h-[40vh] flex flex-col">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg">Users</h2>
        <div className="flex items-center gap-1 max-w-3xs">
          <Search className="h-6 w-6 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <table className="ml-4 max-h-[50vh] overflow-y-auto">
        <thead className="sticky top-0 bg-muted z-10">
          <tr className="text-left">
            <th className="text-sm font-semibold py-2">Name</th>
            <th className="text-sm font-semibold py-2">Email</th>
            <th className="text-sm font-semibold py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="text-sm text-muted-foreground">
              <td className="font-semibold py-2 min-w-32">{user.name}</td>
              <td className="py-2 min-w-60">{user.email}</td>
              <td className="py-2 text-xs text-muted-foreground/50">
                <RolePicker user={user} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
