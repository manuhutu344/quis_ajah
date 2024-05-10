import { prisma } from '@/lib/db'
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import React from 'react'

interface Props{
    params: {
        gameId: string
    }
}

async function page({params: {gameId}}:Props) {
    const session = await getAuthSession()
    if(!session?.user){
        return redirect('/')
    }
    const game = await prisma.game.findUnique({
        where:{
            id: gameId
        },
        include: {
            questions: true
        }
    })
  return (
    <div>
        {JSON.stringify(game, null, 2)}
    </div>
  )
}

export default page