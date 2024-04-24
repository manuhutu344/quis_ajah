import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

function HotTopicsCard() {
  return (
    <Card className="col-span-4">
        <CardHeader>
            <CardTitle className="text-2xl font-bold">
                Topik Panas
            </CardTitle>
            <CardDescription>
                Pencet Sebuah Topik Untuk Memulai quis
            </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
            Katakan Ke Awan
        </CardContent>
    </Card>
  )
}

export default HotTopicsCard