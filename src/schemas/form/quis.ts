import {z} from "zod"

export const quizCreationSchema = z.object({
    topic: z.string().min(4, {message: "Panjang topik minimal harus 4 karakter"}).max(60),
    type: z.enum(['mcq', 'open_ended']),
    amount: z.number().min(1).max(10)
})