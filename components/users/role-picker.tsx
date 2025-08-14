"use client"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { updateRole } from "@/lib/server/user"
import { cn } from "@/lib/utils"
import { UserWithAuthorizedUser } from "@/types/user"
import { Roles } from "@prisma/client"
import { Check, ChevronsUpDown } from "lucide-react"
import { useEffect, useState } from "react"

const roles = [
  {
    value: Roles.ADMIN,
    label: "ADMIN",
  },
  {
    value: Roles.VIEWER,
    label: "USER",
  },
]

export function RolePicker({ user }: { user: UserWithAuthorizedUser }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  useEffect(() => {
    setValue(user.authorizedUser?.role || "")
  }, [user.authorizedUser?.role])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {roles.find((role) => role.value === user.authorizedUser?.role)?.label}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No role found.</CommandEmpty>
            <CommandGroup>
              {roles.map((role) => (
                <CommandItem
                  key={role.value}
                  value={role.value}
                  onSelect={(currentValue) => {
                  setValue(currentValue)
                  updateRole(user.id, currentValue)
                  setOpen(false)
                  }}
                >
                  {role.label}
                  <Check
                  className={cn(
                    "ml-auto",
                    value === role.value ? "opacity-100" : "opacity-0"
                  )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
