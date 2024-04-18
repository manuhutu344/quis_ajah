import { User } from 'next-auth'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import Link from 'next/link'

interface Props{
    user: Pick<User, "name" | "image" | "email">
}

function UserAccountNav({user}:Props) {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>

        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white" align="end">
            <div className="flex item-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                    {user.name && <p className="font-medium">{user.name}</p>}
                    {
                        user.email &&(
                            <p className="w-[200px] truncate text-sm text-zinc-700">
                                {user.email}
                            </p>
                        )
                    }
                </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                    <Link href="/">
                        Kalau Mau Kembali
                    </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav