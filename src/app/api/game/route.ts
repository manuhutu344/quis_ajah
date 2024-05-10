import { getAuthSession } from "@/lib/nextauth";
import { NextResponse } from "next/server";
import { quizCreationSchema } from "@/schemas/form/quis";
import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import axios from "axios";

export async function POST(req: Request, res: Response){
    try {
        const session = await getAuthSession()
        if(!session?.user){
            return NextResponse.json({
                error: "Kamu harus login"
            }, {status:401})
        }
        const body = await req.json()
        const {amount, topic, type} = quizCreationSchema.parse(body)
        const game = await prisma.game.create({
            data:{
                gameType: type,
                timeStarted: new Date(),
                userId: session.user.id,
                topic,
            },
        })
        const {data} = await axios.post(`${process.env.API_URL as string}/api/quetions`,{
            amount,
            topic,
            type
        })
        if(type === "mcq"){
            type mcqQuestion = {
                question: string
                answer: string
                option1: string
                option2: string
                option3: string
            }
            const manyData = data.questions.map((question: mcqQuestion)=>{
                let options = [question.option1, question.option2, question.option3, question.answer]
                options = options.sort(()=>Math.random() - 0.5)
                return {
                    question: question.question,
                    answer: question.answer,
                    options: JSON.stringify(options),
                    gameId: game.id,
                    quetionType: "mcq",
                }
            })
            await prisma.question.createMany({
                data: manyData
            })
        }else if(type === "open_ended"){
            type openQuestion = {
                question: string
                answer: string
            }
            let manyData = data.questions.map((question: openQuestion)=>{
                return{
                    question: question.question,
                    answer: question.answer,
                    gameId: game.id,
                    questionType: "open_ended",
                }
            })
            await prisma.question.createMany({
                data: manyData
            })
        }
        return NextResponse.json({
            gameId: game.id
        })
    } catch (error) {
        if(error instanceof ZodError){
            return NextResponse.json(
                {error: error.issues},
                {
                    status: 400
                }
            )
        }
        return NextResponse.json({
            error: "Ada yang salah di api game POST"
        },
        {
            status: 500
        }
        )
    }
}