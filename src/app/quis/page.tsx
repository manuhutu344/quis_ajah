import QuisCreation from '@/components/QuisCreation'
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata = {
  title: "Quis | Saja"
}

async function page() {
  const session = await getAuthSession()
  if(!session?.user){
    return redirect('/')
  }
  return (
    <QuisCreation />
  )
}

export default page