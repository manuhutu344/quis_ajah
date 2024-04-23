import HistoryCard from '@/components/dashboard/HistoryCard'
import QuisMeCard from '@/components/dashboard/QuisMeCard'
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata={
  title: "Dashboard | Quis Saja"
}

async function page() {
    const session = await getAuthSession()
    if(!session?.user){
        return redirect('/')
    }
  return (
    <main className="p-8 mx-auto max-x-7xl">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tighter">Dashboard</h2>
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2">
          <QuisMeCard />
          <HistoryCard />
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">

      </div>
    </main>
  )
}

export default page