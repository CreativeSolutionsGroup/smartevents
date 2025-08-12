import UserAvatar from "./user-avatar";

export default function AppBar() {

  return (
    <header className="flex justify-between content-center px-3 py-2 bg-primary text-primary-foreground">
      <h1 className="text-2xl">Smart Events</h1>
      <UserAvatar />
    </header>
  )
}