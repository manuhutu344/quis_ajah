import { NextResponse } from "next/server";
import { quizCreationSchema } from "@/schemas/form/quis";
import { ZodError } from "zod";
import { strict_output } from "@/lib/gpt";

export const POST = async (req:Request, res: Response)=>{
    try {
        const body = await req.json()
        const {amount, topic, type} = quizCreationSchema.parse(body)
        let questions: any
        if(type === "open_ended"){
            questions = await strict_output(
                "Anda dapat dibantu dengan Ai dari gpt untuk membantu anda dalam memakai aplikasi ini",
                `Anda dapat mengeneret apapun di ${topic}`,
                {
                    question: "question",
                    answer: "Jawaban dengan panjang maksimal 15 kata"
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