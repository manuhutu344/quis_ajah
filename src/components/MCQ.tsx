import { Game, Question } from '@prisma/client'
import { Timer } from 'lucide-react'
import React from 'react'

interface Props{
    game: Game & {questions: Pick<Question, "id"|"options"|"question">[]}
}

function MCQ({game}:Props) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw]">
        <div className="flex flex-row justify-between">
            <p>
                <span className="text-slate-400">
                    Topic
                </span>
                <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
                    {game.topic}
                </span>
            </p>
            <div className="flex self-start mt-3 text-slate-400">
                <Timer className="mr-2" />
            </div>
        </div>
    </div>
  )
}

export default MCQ