"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import {useForm} from "react-hook-form"
import { quizCreationSchema } from '@/schemas/form/quis'
import { z } from 'zod'
import {zodResolver} from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Button } from './ui/button'
import { Input } from './ui/input'

type Input = z.infer<typeof quizCreationSchema>

function QuisCreation() {
    const form = useForm<Input>({
        resolver: zodResolver(quizCreationSchema),
        defaultValues:{
            amount: 3,
            topic: "",
            type: "open_ended"
        }
    })
    function onSubmit(input: Input){
        alert(JSON.stringify(input, null, 2))
    }
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
            <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Topic</FormLabel>
                <FormControl>
                    <Input placeholder="Masukan Topic Anda" {...field} />
                </FormControl>
                <FormDescription>
                    Tolong Masukan Topik yang tepat
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Nomor Pertanyaan</FormLabel>
                <FormControl>
                    <Input placeholder="Masukan Jumlahnya" {...field} type="number" min={1} max={10} onChange={e =>{
                        form.setValue('amount', parseInt(e.target.value))
                    }} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <Button type="submit">Buat Topik</Button>
      </form>
    </Form>
            </CardContent>
        </Card>
    </div>
  )
}

export default QuisCreation