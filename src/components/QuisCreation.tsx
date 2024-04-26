import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

function QuisCreation() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    Membuat Quis
                </CardTitle>
            <CardDescription>
                Pilih Sebuah Topik
            </CardDescription>
            </CardHeader>
            <CardContent>
                
            </CardContent>
        </Card>
    </div>
  )
}

export default QuisCreation