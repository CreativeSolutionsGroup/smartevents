import { AuthorizedUser, User } from "@prisma/client";

export interface UserWithAuthorizedUser extends User {
  authorizedUser: AuthorizedUser | null;
}