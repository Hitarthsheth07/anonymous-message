import {z} from 'zod'

export const messageSchema = z.object({
  content: z
    .string()
    .min(2, 'Message must at least 2 characters long')
    .max(300, 'Message cannot be longer than 200 characters')
})