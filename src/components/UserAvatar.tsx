import { User } from '@prisma/client'
import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import Image from 'next/image'

interface Props{
    user: Pick<User, "name" | "image">
}

function UserAvatar({user}:Props) {
  return (
    <Avatar>
        {user.image ?(
            <div className="relative w-full h-full aspect-square">
                <Image fill src={user.image} alt='profile image' referrerPolicy='no-referrer' />
            </div>
        ):(
            <AvatarFallback>
                <span className="sr-only">
                    {user?.name}
                </span>
            </AvatarFallback>
        )}
    </Avatar>
  )
}

export default UserAvatar