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
import { BookOpen, CopyCheck } from 'lucide-react'
import { Separator } from './ui/separator'
import {useMutation} from "@tanstack/react-query"
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Input = z.infer<typeof quizCreationSchema>

function QuisCreation() {
    const router = useRouter()
    const {mutate: getQuestions, isPending} = useMutation({
        mutationFn: async ({amount, topic, type}: Input) =>{
            const response = await axios.post("/api/game", {
                amount,
                topic,
                type
            })
            return response.data
        }
    })
    const form = useForm<Input>({
        resolver: zodResolver(quizCreationSchema),
        defaultValues:{
            amount: 3,
            topic: "",
            type: "open_ended"
        }
    })
    async function onSubmit(input: Input){
        getQuestions({
            amount: input.amount,
            topic: input.topic,
            type: input.type,
        }, {
            onSuccess: ({gameId}) =>{
                if(form.getValues('type')== "open_ended"){
                    router.push(`/play/open-ended/${gameId}`)
                }else{
                    router.push(`/play/mcq/${gameId}`)
                }
            }
        })
    }
    form.watch()
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
        <div className="flex justify-between">
            <Button type="button" onClick={()=>{
                form.setValue('type', 'mcq')
            }} variant={form.getValues('type') === 'mcq' ? 'default':'secondary'} className="w-1/2 rounded-none rounded-l-lg">
                <CopyCheck className="w-4 h-4 mr-2" /> Pilihan Ganda
            </Button>
            <Separator orientation="vertical" />
            <Button type="button" onClick={()=>{
                form.setValue('type', 'open_ended')
            }} variant={form.getValues('type') === 'open_ended' ? 'default':'secondary'} className="w-1/2 rounded-none rounded-r-lg">
            <BookOpen className="w-4 h-4 mr-2" /> Berakhir
            </Button>
        </div>
        <Button disabled={isPending} type="submit">Buat Topik</Button>
      </form>
    </Form>
            </CardContent>
        </Card>
    </div>
  )
}

export default QuisCreation