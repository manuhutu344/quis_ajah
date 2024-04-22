import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import React from 'react'

async function page() {
    const session = await getAuthSession()
    if(!session?.user){
        return redirect('/')
    }
  return (
    <div>page</div>
  )
}

export default page