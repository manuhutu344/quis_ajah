"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { History } from 'lucide-react'
import { useRouter } from 'next/navigation'

function HistoryCard() {
  const router = useRouter()
  return (
    <Card onClick={()=>{
      router.push("/history")
    }} className="hover:cursor-pointer hover:opacity-75">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-2xl font-bold">
            History
          </CardTitle>
          <History size={28} strokeWidth={2.5} />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
            Lihat Postingan Quis
        </p>
      </CardContent>
    </Card>
  )
}

export default HistoryCard