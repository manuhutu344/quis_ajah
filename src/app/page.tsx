import SignInBottom from '@/components/SignInBottom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {getAuthSession} from '@/lib/nextauth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getAuthSession()
  if(session?.user){
    redirect('/dashboard')
  }
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>
            Selamat Datang Di Quis Ajah
          </CardTitle>
          <CardDescription>
            Ini Quis Menggunakan AI Didalamnya Untuk Menilai Hasil Quis Kalian
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInBottom text="Masuk Bisa Menggunakan Google" />
        </CardContent>
      </Card>
    </div>
  )
}
