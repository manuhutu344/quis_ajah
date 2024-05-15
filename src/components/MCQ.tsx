"use client"

import { Game, Question } from '@prisma/client'
import { Timer } from 'lucide-react'
import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

interface Props{
    game: Game & {questions: Pick<Question, "id"|"options"|"question">[]}
}

function MCQ({game}:Props) {
    const [questionIndex, setQuestionIndex] = React.useState(0)

    const currentQuestion = React.useMemo(()=>{
        return game.questions[questionIndex]
    }, [questionIndex, game.questions])

    const options = React.useMemo(()=>{
        if(!currentQuestion){
            return []
        }
        if(!currentQuestion.options){
            return []
        }
        return JSON.parse(currentQuestion.options as string) as string []
    }, [currentQuestion])
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw]">
        <div className="flex flex-row justify-between">
            <p>
                <span className="text-slate-400 mr-2">
                    Topic
                </span>
                <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
                    {game.topic}
                </span>
            </p>
            <div className="flex self-start mt-3 text-slate-400">
                <Timer className="mr-2" />
                <span>00:00</span>
            </div>
            {/* <MCQCounter /> */}
        </div>
        <Card className="w-full mt-4">
            <CardHeader className="flex flex-row items-center">
                <CardTitle className="mr-5 text-center divide-y divide-zinc-800/80">
                    <div>
                        {questionIndex + 1}
                    </div>
                    <div className="text-base text-slate-400">
                        {game.questions.length}
                    </div>
                </CardTitle>
                <CardDescription className="flex-grow text-lg">
                   {currentQuestion.question}
                </CardDescription>
            </CardHeader>
        </Card>
        <div className="flex flex-col items-center justify-center mt-4">
            {options.map((option, index)=>{
                return (
                    <Button key={index}>
                        <div className="flex items-center justify-start">
                            <div className="p-2 px-3 mr-5 border rounded-md">

                            </div>
                        </div>
                    </Button>
                )
            })}
        </div>
    </div>
  )
}

export default MCQ