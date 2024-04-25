import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

function RecentActivities() {
  return (
    <Card className="col-span-4 lg:col-span-3">
        <CardHeader>
            <CardTitle className="text-2xl font-bold">
                Aktivitas Terbaru
            </CardTitle>
            <CardDescription>
                Anda telah memainkan total 7 permainan
            </CardDescription>
        </CardHeader>
        <CardContent className="max-h-[580px] overflow-scroll">
                History
        </CardContent>
    </Card>
  )
}

export default RecentActivities