import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(5, "Username must be 5 charecters long")
  .max(29, "Username must be less than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Special characters are not allowed");


export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email('Invalid Email Address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})