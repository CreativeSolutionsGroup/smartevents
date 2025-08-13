"use client";

import { UserWithAuthorizedUser } from "@/types/user";
import { Roles } from "@prisma/client";
import { useMemo, useState } from "react";

export default function UserSearch({
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
    <div>
      <div className="flex items-center gap-2">
        <h2 className="text-lg">Users</h2>
        <input
          type="text"
          placeholder="Search users..."
          className="px-2 py-1 text-sm border border-border rounded-md bg-background"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <table className="ml-4 w-full max-h-[50vh] overflow-y-auto">
        <thead>
          <tr className="text-left">
            <th className="text-sm font-semibold py-2">Name</th>
            <th className="text-sm font-semibold py-2">Email</th>
            <th className="text-sm font-semibold py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="text-sm text-muted-foreground">
              <td className="font-semibold py-2">{user.name}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2 text-xs text-muted-foreground/50">
                {user.authorizedUser?.role || Roles.VIEWER}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
