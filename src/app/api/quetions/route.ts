import { NextResponse } from "next/server";
import { quizCreationSchema } from "@/schemas/form/quis";
import { ZodError } from "zod";
import { strict_output } from "@/lib/gpt";
import { getAuthSession } from "@/lib/nextauth";

export const POST = async (req:Request, res: Response)=>{
    try {
        const session = await getAuthSession()
        if(!session?.user){
            return NextResponse.json(
                {
                    error: "Kamu harus login dulu"
                },
                {
                    status: 401
                }
            )
        }
        const body = await req.json()
        const {amount, topic, type} = quizCreationSchema.parse(body)
        let questions: any
        if(type === "open_ended"){
            questions = await strict_output(
                "Anda dapat dibantu dengan Ai dari gpt untuk membantu anda dalam memakai aplikasi ini",
                new Array(amount).fill(`Anda dapat mengeneret apapun di ${topic}`),
                {
                    question: "question",
                    answer: "Jawaban dengan panjang maksimal 15 kata"
                }
            )
        }else if (type === "mcq"){
            questions = await strict_output(
                'Anda dapat dibantu dengan AI untuk generate mcq dari pertanyaan ataupun jawaban, minimal pertannyan adalah 15 kata',
                new Array(amount).fill(
                    `Anda dapat mengeneret apapun di ${topic}`
                ),
                {
                    question: 'question',
                    answer: 'Jawaban dengan panjang maksimal 15 kata',
                    option1: "Pertanyaan 1 dengan panjang maksimal 15 kata",
                    option2: "Pertanyaan 2 dengan panjang maksimal 15 kata",
                    option3: "Pertanyaan 3 dengan panjang maksimal 15 kata",
                }
            )
        }
        return NextResponse.json({
            questions,
        }, {
            status: 200
        })
    } catch (error) {
        if(error instanceof ZodError){
            return NextResponse.json({
                error: error.issues,
            },{
                status: 400,
            })
        }
    }
}